const express = require("express");
const app = express();
const mysql = require("mysql2");
const mysqlConnection = require("./connection");
const {Sequelize, DataTypes} = require('sequelize');
const dotenv = require("dotenv");

const authRoute =  require("./routes/auth");

const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const fileUpload = require('express-fileupload');


app.use(fileUpload({
    useTempFiles: true
}));


dotenv.config();


app.use(express.json());

app.use("/api/v1/auth", authRoute);


app.get("/createdb", (req, res) => {
    let sql = 'CREATE DATABASE mozphin';
    mysqlConnection.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Database created....  ')
    })
})

// app.get("/createuserstable", (req, res) => {
//     let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), isAdmin TINYINT(1), PRIMARY KEY(id) )';
//     mysqlConnection.query(sql, (err, result) =>{
//         if(err) throw err;
//         console.log(result);
//         res.send('User table created....  ')
//     })
// })


app.listen(process.env.PORT || 5000, () => {
    var PORT = process.env.PORT ?? 5000
    console.log("backend srver is running", PORT)

})