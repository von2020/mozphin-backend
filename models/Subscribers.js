const mysqlConnection = require("../connection");
const {Sequelize, DataTypes} = require('sequelize');


const subscriberSchema = new mongoose.Schema({
    fname: { type: String, required:true },
    lname: { type: String},
    email: { type: String, required:true},
    phone: { type: Number, required:true},
    message: { type: String, required:true},
    
},
{ timestamps: true }
);



module.exports = mongoose.model("Subscriber", subscriberSchema);