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
                port:587,
                secure:false,
                requireTLS:true,
                pool:true,
                maxConnections: 1,
                auth:{
                    user:config.emailUser,
                    pass:config.emailPassword
                }
            });

class auth_controllers {

// 1. reset Password
// static async sendResetPasswordMail (name, email, token) {
//     const User = db.users 

//     try{

//         const transporter =  nodemailer.createTransport({
//             host:'smtp.gmail.com',
//             port:587,
//             secure:false,
//             requireTLS:true,
//             auth:{
//                 user:config.emailUser,
//                 pass:config.emailPassword
//             }
//         });

//        const mailOptions = {
//             from:config.emailUser,
//             to:email,
//             subject:'For Reset Password',
//             html:'<p> Hi '+name+', Please click on the link and<a href="http://localhost:5000/api/v1/auth/resetPassword?token'+token+'"> reset your password</a> </p>'
//        } 
//        transporter.sendMail(mailOptions, function(error, info){

//             if(error){
//                 console.log(error);
//              }
//             else{
//                 console.log("Mail has been sent:-", info.response);
//             }
//        })

//     }catch(error){
//         res.status(400).send({success:false, msg:error.message})
//     }
    
// }
 
// 1. create users
static async addUser (req, res) {
    const User = db.users 
    console.log('password', req.body.password)
    const query = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        phone : req.body.phone,
        email : req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        
    }

    const users = await User.create(query)
    res.status(200).send(users)
    console.log('users', users)

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

        if(userData){
            const randomString = randomstring.generate();
            const data = await User.update({$set:{token:randomString}}, { where: {email:email} })
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
                html:'<p> Hi '+userData.firstname+', Please click on the link and<a href="http://localhost:5000/api/v1/auth/resetPassword?token='+randomString+'"> reset your password</a> </p>'
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

}

module.exports = auth_controllers 