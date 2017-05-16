const request = require('request');
const request_host = "http://ecollect-31-service.tmtest.cn/api/";
//const request_host = "http://ecollect-4.0-service.mobilemd.cn:91/api/";
//get http headers
function getApiHeader(uc) {
    return {
        SessionKey: uc.SessionKey || "",
        EquipmentCode: "11",
        ActionName: "",
        Language: "chs",
        SignValue: "",
        Ip: ""
    };
}

function getRequest(options) {
    var req = options.req;
    var _param = req.body;//post
    var uc = {};
    var usercache = req.cookies.usercache;
    if(usercache) {
        uc = JSON.parse(usercache);
    }
    var _header = getApiHeader(uc);

    var opts = {
        method:req.method,
        baseUrl:config.host,
        uri: req.originalUrl,
        headers:{
            ApiHeader:JSON.stringify(_header)
        },
        body:_param,
        gzip: true,
        timeout:60000,
        json:true
    };
    request(opts, function (error, response, body) {
       if(response.statusCode && response.statusCode !== 200){
            body = {
                Code:response.statusCode,
                Message:response.statusMessage
            }
        }
        options.callback(body);
    })
}
function getCallback(req, res, next) {
    getRequest({
        req:req,
        callback:function (result) {
            res.json(result);
        }
    })
}


const config = {
    host:request_host,
	request:getRequest,
    callback:getCallback,
	message:"配置全局封装方法..."
};

module.exports = config;