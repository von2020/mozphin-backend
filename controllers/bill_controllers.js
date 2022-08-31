const db = require('../models')
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const { bill_queries } = require('../queries/index');
const res = require('express/lib/response');
const  config  = require('../config/config');

const {
    allServices,
    dataSubscribe,
    airtimeSubscribe,
    phcnSubscribe,
    cableSubscribe
} = bill_queries;


class bill_controllers {


    //1.  all services
    static async allServices(req, res) {
        
        try {
            const { result, resbody } = await allServices();
            var services = resbody
            console.log('services',services)
            res.status(200).send(services)
            

        } catch (err) {
            if (err) console.log('error', err)
            return res.status(200).send("error:", err);
                    
        }
    };

 
// 2. data subscription
static async dataSub (req, res) {
    
    const query = {
        recipient_number : req.body.recipient_number,
        product_id : req.body.product_id,
        transaction_pin : req.body.transaction_pin,
        amount : req.body.amount,
        reference : req.body.reference,
        mode : req.body.mode,
    }
    
    console.log('The query:', query)
        try {
            const { result, resbody } = await dataSubscribe();
            const data = resbody
            console.log('data:', data)

            res.status(200).send(data)
            
        } catch (err) {
            if (err) console.log('error', err)
            return res.status(200).send("error:", err);
        }
    

    }


// 3. cable subscription
static async cableSub (req, res) {
    
    const query = {
        product_id : req.body.product_id,
        decoder_number : req.body.decoder_number,
        transaction_pin : req.body.transaction_pin,
        amount : req.body.amount,
        reference : req.body.reference,
        mode : req.body.mode,
    }
    
    console.log('The query:', query)
        try {
            const { result, resbody } = await airtimeSubscribe();
            const data = resbody
            console.log('data:', data)

            res.status(200).send(data)
            
        } catch (err) {
            if (err) console.log('error', err)
            return res.status(200).send("error:", err);
        }
    

    }


    // 4. airtime subscription
static async airtimeSub (req, res) {
    
    const query = {
        recipient_number : req.body.recipient_number,
        service_id : req.body.service_id,
        transaction_pin : req.body.transaction_pin,
        amount : req.body.amount,
        reference : req.body.reference,
        mode : req.body.mode,
    }
    
    console.log('The query:', query)
        try {
            const { result, resbody } = await cableSubscribe();
            const data = resbody
            console.log('data:', data)

            res.status(200).send(data)
            
        } catch (err) {
            if (err) console.log('error', err)
            return res.status(200).send("error:", err);
        }
    

    }

    // 4. phcn subscription
static async phcnSub (req, res) {
    
    const query = {
        service_id : req.body.service_id,
        meter_number : req.body.meter_number,
        meter_type : req.body.meter_type,
        transaction_pin : req.body.transaction_pin,
        amount : req.body.amount,
        reference : req.body.reference,
        mode : req.body.mode,
    }
    
    console.log('The query:', query)
        try {
            const { result, resbody } = await phcnSubscribe();
            const data = resbody
            console.log('data:', data)

            res.status(200).send(data)
            
        } catch (err) {
            if (err) console.log('error', err)
            return res.status(200).send("error:", err);
        }
    

    }


}

module.exports = bill_controllers 