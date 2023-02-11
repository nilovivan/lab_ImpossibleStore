const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const User_cart = sequelize.define('user_cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Cart_product = sequelize.define('cart_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.TEXT, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
})

User.hasOne(User_cart)
User_cart.belongsTo(User)

Product.hasOne(Cart_product)
Cart_product.belongsTo(Product)

User_cart.hasMany(Cart_product)
Cart_product.belongsTo(User_cart)

module.exports = {
    User,
    User_cart,
    Cart_product,
    Product,
}