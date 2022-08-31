const {getResponse, getResponse_get, putResponseparam, postResponse,postResponse_reset, getResponse_request, putResponse} = require('../utils/query_util');

class bill_queries {
    static async allServices() {
        const url = 'api/v1/services';
        try {
            const {result, resbody} = await getResponse_get(url)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async dataSubscribe(query) {
        const url = 'merchants/transactions/data/subscribe';
        console.log('contact', query)
        try {
            const {result, resbody} = await postResponse(query, url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async airtimeSubscribe(query) {
        const url = 'merchants/transactions/airtime/vend';
        console.log('contact', query)
        try {
            const {result, resbody} = await postResponse(query, url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async phcnSubscribe(query) {
        const url = 'merchants/transactions/energy/subscribe';
        console.log('contact', query)
        try {
            const {result, resbody} = await postResponse(query, url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async cableSubscribe(query) {
        const url = 'merchants/transactions/cable/subscribe';
        console.log('contact', query)
        try {
            const {result, resbody} = await postResponse(query, url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

}

module.exports = bill_queries