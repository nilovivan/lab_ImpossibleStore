const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const CartProduct = sequelize.define('cartProduct', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull:false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const MailUser = sequelize.define('mailUser', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    restore_hash: {type: DataTypes.STRING, defaultValue: "None"}
})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    from: {type: DataTypes.TEXT, allowNull:false},
    to: {type: DataTypes.TEXT, allowNull:false},
    text: {type: DataTypes.TEXT, allowNull:false},
})

User.hasOne(Cart)
Cart.belongsTo(User)

Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)

MailUser.hasMany(Message)
Message.belongsTo(MailUser)


module.exports = {
    User,
    Cart,
    CartProduct,
    Product,
    MailUser,
    Message
}