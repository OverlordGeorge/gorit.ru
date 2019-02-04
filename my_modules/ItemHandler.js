module.exports = class ItemHandler {
    constructor(coll) {
        this.coll = coll;
    }

    setQuery(req, callback, page = undefined, skip = undefined){
        let obj = {};
        let params = req.query;
        this.addName(params, obj);
        this.addPrice(params, obj);
        if (page === undefined || skip === undefined) {
            this.coll.find(obj).toArray(function (err, res) {
                if (err) {
                    console.log(err);
                }
                callback(res);
            })
        }
        else {
            this.find(obj).skip(page).limit(skip).toArray(function (err, res) {
                if (err) {
                    console.log(err);
                }
                callback(res);
            })
        }
    }

    addName(req, obj){
        if (req.name!==undefined){
            obj['properties.name'] = new RegExp(req.name)
        }
        return obj;
    }

    addPrice(req, obj){
        if (req.startPrice !==undefined && req.endPrice !== undefined){
            obj["properties.price"] = {'$gte': req.startPrice, '$lte':req.endPrice};
            return obj;
        }
        if (req.startPrice !== undefined){
            obj["properties.price"] = {'$gte': req.startPrice};
        }
        if (req.endPrice !== undefined){
            obj["properties.price"] = {'$lte': req.endPrice};
        }
        return obj;
    }

};