class ProductsHandler {

    constructor(productCollection){
        this.coll = productCollection;
    }

    find(params, callback){
        this.coll.find(params).toArray(function (err, result) {
            if (err){
                console.log('mistake during finding objects');
                throw err;
            }
            callback(result);
        })
    }

}

module.exports.ProductsHandler = ProductsHandler;