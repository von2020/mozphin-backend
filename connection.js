const express = require("express");
const app = express();
const mysql = require("mysql2");


const mysqlConnection = mysql.createConnection({
    host : '38.242.253.175',
    user : 'fixmaster4', 
    password: 'Jum$$2022@04',
    database: 'mozphin',
    dialect:'mysql',

    // pool:{
    //     max: 5,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000
    // }
})


mysqlConnection.connect((err) =>{
    if(err){
        console.error('error connecting: ' + err.stack);
    return;
    }
    console.log('backend connected.........')
});


module.exports = mysqlConnection;