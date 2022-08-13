module.exports = (sequelize, DataTypes) => {
    const userSchema = sequelize.define("users", { 
        firstname: { type: DataTypes.STRING, allowNull: false },
        lastname: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false, unique: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
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
        token:{
            type: DataTypes.STRING, 
            defaultValue: ''
        },
    },
    { timestamps: true }
    );

    return userSchema
};