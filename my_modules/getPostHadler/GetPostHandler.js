class GetPostHandler{
    constructor(){

    }

    parseGetParams(req){
        let params = {};
        let querykeys = Object.keys(req.query);
        for (let key in querykeys){
            if (req.query[key]!==""){
                params.push(req.query[key]);
            }
        }
        return params;
    }
}

module.exports.GetPostHandle = GetPostHandler;