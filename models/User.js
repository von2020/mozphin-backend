module.exports = (sequelize, DataTypes) => {
    const userSchema = sequelize.define("users", { 
        firstname: { type: DataTypes.STRING, allowNull: false },
        lastname: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false, unique: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        customerID: { type: DataTypes.STRING, allowNull: false, unique: true },
        tier: { type: DataTypes.STRING, allowNull: false, defaultValue: '1' },
        password: { type: DataTypes.STRING, allowNull: false, defaultValue: 'password123'},
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isSuperAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isActive:{
            type: DataTypes.BOOLEAN, 
            defaultValue: false
        },
        isApproved:{
            type: DataTypes.BOOLEAN, 
            defaultValue: false
        },
        token:{
            type: DataTypes.STRING, 
            defaultValue: ''
        },
        transactionPIN:{
            type: DataTypes.STRING, 
            defaultValue: ''
        },
        accountNumber:{
            type: DataTypes.STRING, 
            defaultValue: ''
        },
        bvn:{
            type: DataTypes.STRING, 
            defaultValue: ''
        },
    },
    { timestamps: true }
    );

    return userSchema
};