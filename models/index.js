const dbConfig = require("../dbConfig");

const {Sequelize, DataTypes} = require('sequelize');
console.log('1', dbConfig)
console.log('2', dbConfig.host)
console.log('3', dbConfig.user)

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password, {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        

        // pool:{
        //     max: dbConfig.pool.max,
        //     min: dbConfig.pool.min,
        //     acquire: dbConfig.pool.acquire,
        //     idle: dbConfig.pool.idle,
        // }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected here...')
})
.catch(err => {
    console.log('Error' + err) 
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./User.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

module.exports = db