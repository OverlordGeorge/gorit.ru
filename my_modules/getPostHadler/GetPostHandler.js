class GetPostHandler{
    constructor(){

    }

    parseGetParams(req){
        let params = {};
        for (let key in req.query){
            if (req.query[key]!==""){
                params[key] = req.query[key];
            }
        }
        return params;
    }
}

module.exports.GetPostHandle = GetPostHandler;