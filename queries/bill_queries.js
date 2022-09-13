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

    static async allProducts(id) {
        const url = `api/v1/services/${id}/products`;
        try {
            const {result, resbody} = await getResponse_get(url)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async dataSubscribe(query, signature) {
        const url = 'api/v1/merchants/transactions/data/subscribe';
        console.log('contact', query)
        try {
            const {result, resbody} = await postResponse(query,signature, url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async airtimeSubscribe(query, signature) {
        const url = 'api/v1/merchants/transactions/airtime/vend';
        console.log('contact', query)
        try {
            const {result, resbody} = await postResponse(query,signature, url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async billPin(query, signature) {
        const url = 'api/v1/merchants/profile/transaction-pin';
        console.log('contact', query)
        try {
            const {result, resbody} = await postResponse(query,signature,url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async encryptBillPin(query, signature) {
        const url = 'api/v1/merchants/pin/encrypt';
        console.log('contact', query)
        try {
            const {result, resbody} = await postResponse(query,signature,url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async validateCableSub(query, signature) {
        const url = 'api/v1/merchants/transactions/cable/validate';
        console.log('contact', query)
        try {
            const {result, resbody} = await postResponse(query,signature,url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async validatePhcnSub(query, signature) {
        const url = 'api/v1/merchants/transactions/energy/validate';
        console.log('contact', query)
        try {
            const {result, resbody} = await postResponse(query,signature,url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async phcnSubscribe(query, signature) {
        const url = 'api/v1/merchants/transactions/energy/subscribe';
        console.log('contact', query)
        try {
            const {result, resbody} = await postResponse(query,signature, url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async cableSubscribe(query, signature) {
        const url = 'api/v1/merchants/transactions/cable/subscribe';
        console.log('contact', query)
        try {
            const {result, resbody} = await postResponse(query,signature,url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

}

module.exports = bill_queries