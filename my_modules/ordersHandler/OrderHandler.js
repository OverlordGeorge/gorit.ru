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

    calculateOrderPrice(orders, callback) {
        let products = [];
        orders.forEach( (order) => {
            let id = order.id;
            products.push(new ObjectID(id.toString()));
        })
        this.productColl.find({_id:{$in:products}}).toArray( (err, result) => {
            if (err){
                throw new Error("db error");
            }
            let price = 0;
            for (let i = 0; i<result.length; i++){
                price+= result[i].price * orders[i].count;
            }
            callback(price);
        })
    }

    insertOrder(params, callback){
        let preparedParams = this.prepareParams(params);
        this.calculateOrderPrice(preparedParams.order, (price)=>{
            preparedParams['price'] = price;
            this.orderColl.insertOne(preparedParams, (err, res) => {
                if (err){
                    throw new Error("db error");
                }
                callback(preparedParams);
            })
        });
    }

}

module.exports.OrderHandler = OrderHandler;