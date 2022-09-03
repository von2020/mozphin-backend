const CryptoJS = require("crypto-js");

class Authorize {

    static authorize (req, res, next) {
        if(req.method === "POST" || req.method === "PATCH") {
            const apiKey = process.env.APIKEY
            console.log('method',req.method)
            console.log('data', (JSON.stringify(req.body)))
            console.log('apiKey', apiKey)
            const body = JSON.stringify(req.body)
            console.log('body', body)
            const hash = CryptoJS.HmacSHA256(body, apiKey)
            const b64 = hash.toString(CryptoJS.enc.Base64)
            console.log('b64', b64)
            process.env.SIGNATURE = b64
            return next()
            //pm.environment.set("signature", b64)
        }

    };

    

};

module.exports = Authorize