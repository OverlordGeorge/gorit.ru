let ObjectID = require('mongodb').ObjectID;

class OrderHandler {

    constructor(orderCollection, productsColl) {
        this.orderColl = orderCollection;
        this.productColl = productsColl;
    }

    prepareParams(params) {
        if (!params['phone']){
            throw new Error("phone is missing");
        }
        if (!params['order']) {
            params['order'] = [];
        } else {
            params['order'] = JSON.parse(params['order']);
        }
        return params;
    }

    findOrder(id, orders){
        for (let i=0;i<orders.length; i++) {
            if (id === orders[i].id){
                return orders[i];
            }
        }
        return -1;
    }

    calculateOrderPrice(orders) {
        let price = 0;
        orders.forEach( (order) => {
            price+=order.count * order.productInfo.price;
        })
        return price;
    }

    findOrderInfo(orders, callback) {
        let products = [];
        orders.forEach( (order) => {
            let id = order.id;
            products.push(new ObjectID(id.toString()));
        })
        let newOrders = [];
        this.productColl.find({_id:{$in:products}}).toArray( (err, result) => {
            if (err){
                throw new Error("db error");
            }
            for (let i = 0; i<result.length; i++){
                let order = this.findOrder(result[i]._id.toString(), orders);
                newOrders.push({
                    count: order.count,
                    productInfo: result[i]
                })
            }
            callback(newOrders);
        })
    }

    prepareProductsForOrderDb(orders) {
        let res = [];
        orders.forEach( (product) => {
            res.push({id: product.productInfo._id.toString(), count: product.count});
        })
        return res;
    }

    insertOrder(params, callback){
        let preparedParams = this.prepareParams(params);
        this.findOrderInfo(preparedParams.order, (orders) => {
           preparedParams['price'] = this.calculateOrderPrice(orders);;
            this.orderColl.insertOne(preparedParams, (err, res) => {
                if (err){
                    throw new Error("db error");
                }
                preparedParams['order'] = orders;
                callback(preparedParams);
            })
        });
        /*this.calculateOrderPrice(preparedParams.order, (price)=>{
            preparedParams['price'] = price;
            this.orderColl.insertOne(preparedParams, (err, res) => {
                if (err){
                    throw new Error("db error");
                }
                callback(preparedParams);
            })
        });*/
    }

}

module.exports.OrderHandler = OrderHandler;