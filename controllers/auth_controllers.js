const db = require('../models')
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require('../models/User');

const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const res = require('express/lib/response');
const  config  = require('../config/config');

const transporter =  nodemailer.createTransport({
                host:'smtp.gmail.com',
                port:465,
                secure:true,
                requireTLS:true,
                pool:true,
                maxConnections: 1,
                auth:{
                    user:config.emailUser,
                    pass:config.emailPassword
                }
            });

class auth_controllers {


 
// 1. create users
static async addUser (req, res) {
    const User = db.users 
    
    // console.log('password', req.body.password)
    const query = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        phone : req.body.phone,
        email : req.body.email,
        customerID : req.body.customerID,
          
    }
    const email = req.body.email
    let user = await User.findOne({ where: { email: email }})
    if(!user){
        const users = await User.create(query)
        res.status(200).send(users)
        console.log('users', users)
    }else{
        return res.status(200).send('User already exists.');
    }
    

    }

    //2.  all users
static async allUsers (req, res) {
    const User = db.users
    let users = await User.findAll()
    res.status(200).send(users)
    }

//3. single user
static async singleUsers (req, res) {
    const User = db.users
    let id = req.params.id
    console.log('here', id)
    let user = await User.findOne({ where: { id: id }})
    res.status(200).send(user)
    }


    // 4. update user
static async updateUser (req, res) {
    console.log('hereeeeeeeeeeeeeee')
    const User = db.users
    

    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }
    try{
        let id = req.params.id
    console.log('id', id)
    const user = await User.update(req.body, { where: { id: id }})
    console.log('user', user)
    res.status(200).send(user)
    }catch(err){
        console.log('err', err)
        res.status(500).json(err);
    }

    }

    // 5. user login

static async login (req, res){
    console.log('sign in ....')
    const User = db.users
    
        User.findOne({
            where: {
                phone: req.body.phone
            }
        }).then(user => {
            if (!user){
                return res.status(404).send('User Not Found.');
            }
            console.log('user', user)
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password, 
                process.env.PASS_SEC
                );
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            
            originalPassword !== req.body.password && 
            res.status(401).json("Wrong Password!")
            
            const accessToken =  jwt.sign({
                id:user.id ,
                isAdmin: user.isAdmin,
            }, process.env.JWT_SEC,
            {expiresIn:"3d"}
            );
            const { password,  ...others} = user.dataValues;

            res.status(200).json({...others, accessToken});
        }).catch(err => {
            console.log(err);
            res.status(500).send('Error -> ' + err)
        });
        // !user && res.status(401).json("Wrong Credentials!")

        // console.log('user', user)

}

// 6. Forget Password

static async forgetPassword (req, res) {
    console.log('hereeeeeeeeeeeeeee')
    const User = db.users
    
    
    try{

        const email = req.body.email
        const userData = await User.findOne({ where: {email:email} });
        console.log('userData', userData)
        if(userData){
            const randomString = randomstring.generate();
            const data = await User.update({token:randomString}, { where: {email:email} })
            console.log('data', data)
            // sendResetPasswordMail(userData.firstname, userData.email, randomString);
            // reset Password
            console.log('email', userData.email)
            console.log('firstname', userData.firstname)
            console.log('token', randomString)
            console.log('emailUser', config.emailUser)
            console.log('emailPassword', config.emailPassword)
            
            console.log('transporter', transporter)
           const mailOptions = {
                from:config.emailUser,
                to:userData.email,
                subject:'For Reset Password',
                html:'<p> Hi '+userData.firstname+', Please copy token to reset password =>  ' +randomString+ '  </p>'
           } 
           console.log('mailOptions', mailOptions)
           transporter.sendMail(mailOptions, function(error, info){
    
                if(error){
                    console.log(error);
                 }
                else{
                    console.log("Mail has been sent:-", info.response);
                }
           })

            res.status(200).send({success:true, msg:"Please check your email"})
        }
        else{
            res.status(200).send({success:true, msg:"This email does not exist"})
        }
        
    }catch(err){
        console.log('err', err)
        res.status(500).json(err);
    }

    }

// .7 Reset Password

static async resetPassword (req, res) {
    const User = db.users
        try{
            const token = req.query.token;
            const tokenData = await User.findOne({ where: {token:token} });
            console.log('tokenData', tokenData.dataValues)
            console.log('token', token)
            if(tokenData){
                const password = req.body.password;
                const newPassword = await  CryptoJS.AES.encrypt(
                    password,
                    process.env.PASS_SEC
                ).toString();;
                const userData = await User.update({password:newPassword, token:''}, { where: {id:tokenData.id}},{new:true})
                res.status(200).send({success:true, msg:"User Password Reset Successfully", data:userData})
            }else{
                res.status(200).send({success:true, msg:"This link has expired"})
            }

        } catch(err){
            console.log('err', err)
            res.status(500).json(err);
        }
    }

// 8. Update Password
static async updatePassword (req, res) {
    const User = db.users
    try{

        const user_id = req.body.user_id;
        const password = req.body.password;

        const data = await User.findOne({ where: {id:user_id} });

        if(data){
            const newPassword = await  CryptoJS.AES.encrypt(
                password,
                process.env.PASS_SEC
            ).toString();
            const userData = await User.update({password:newPassword}, { where: {id:user_id}})
            res.status(200).send({success:true, msg:"User Password Created Successfully", data:userData})
        }else{
            res.status(200).send({ success:false, msg:"User Id not found!" });
        }

    }catch(error){
        console.log('err', error)
        res.status(500).json(error);
    }
}

// 9. create Transaction PIN
static async createTransactionPin (req, res) {
    const User = db.users
    try{

        const user_id = req.body.user_id;
        const transaction_pin = req.body.transaction_pin;

        const data = await User.findOne({ where: {id:user_id} });

        if(data){
            
            const userData = await User.update({transactionPIN:transaction_pin}, { where: {id:user_id}})
            res.status(200).send({success:true, msg:"Transaction Pin Created Successfully", data:userData})
        }else{
            res.status(200).send({ success:false, msg:"User Id not found!" });
        }

    }catch(error){
        console.log('err', error)
        res.status(500).json(error);
    }
}

// 10. validate Transaction PIN
static async validateTransactionPin (req, res) {
    const User = db.users
    try{

        const user_id = req.body.user_id;
        const transaction_pin = req.body.transaction_pin;

        const data = await User.findOne({ where: {id:user_id} });
        const userPin = data.transactionPIN

        console.log('userPIN', userPin)

        if(data && userPin == transaction_pin){
            res.status(200).send({success:true, msg:"Transaction Successful"})
        }else if(data && userPin != transaction_pin){
            res.status(200).send({ success:false, msg:"Wrong Transaction Pin!" });
        
        }else{
            res.status(200).send({ success:false, msg:"User Id not found!" });
        }

    }catch(error){
        console.log('err', error)
        res.status(500).json(error);
    }
}

}

module.exports = auth_controllers 