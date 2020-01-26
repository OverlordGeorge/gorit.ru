class ProductsHandler {

    constructor(productCollection) {
        this.coll = productCollection;
    }

    prepareParams(params) {
        let newParams = {

        };
        if (params['name']) {
            newParams['name'] = {$regex: params['name']};
        }
        if (params['minPrice']){
            newParams['price'] = {$gte: params['minPrice']};
        }
        if (params['maxPrice']){
            if (newParams['price']){
                newParams['price'] = {
                    $gte: params['minPrice'],
                    $lte: params['maxPrice']
                }
            }
            else{
                newParams['price'] = {
                    $lte: params['maxPrice']
                }
            }
        }
        return newParams;
    }

    find(params, callback) {
        let newParams = this.prepareParams(params);
        this.coll.find(newParams).toArray(function (err, result) {
            if (err) {
                console.log('mistake during finding objects');
                throw err;
            }
            callback(result);
        })
    }

}

module.exports.ProductsHandler = ProductsHandler;