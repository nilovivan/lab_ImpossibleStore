const ApiError = require('../error/ApiError'); //подгружаем кастомные ошибки
const bcrypt = require('bcrypt'); //Хэшируем пароли для хранения в бд
const jwt = require('jsonwebtoken');
const {User, Cart, CartProduct, MailUser} = require('../models/models');
const sequelize = require("express");
const db = require('../db');
const sendMessage = require('./mailController').send_email


const generateJWT = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '2h'}
    )
}

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Wrong data'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('User with this email already has an account!'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const cart = await Cart.create({userId: user.id})
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.internal('User not found'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal("Wrong password!"))
            }
            const token = generateJWT(user.id, user.email, user.role)
            return res.json({token})
        } catch (e) {
            next (ApiError.badRequest(e.message))
        }
    }

    async check(req,res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async discount(req, res, next) {
        const codes = {
            MINUS10: '0.9',
            MINUS20: '0.8',
            MINUS30: '0.7'
        };
        try {
            const {good, code} = req.body
            return res.json({price: eval('good.price *' + ('codes.' + code))})
        } catch (e) {
            next (ApiError.badRequest(e.message))
        }
    }

    async add_product(req, res, next) { // добавляем товар в корзину ползователя по id товара и пользователя
        try {
            const {productId} = req.body
            const token = parseJwt(req.headers.authorization.split(' ')[1])
            const email = token.email
            const user = await User.findOne({where: {email}})
            const userId = user.id
            const user_cart = await Cart.findOne({where: {userId}})
            await CartProduct.create({cartId: user_cart.id, productId: productId})
            return res.json({})
        } catch (e) {
            next (ApiError.badRequest(e.message))
        }

    }

    async remove_product(req, res, next) { // убираем товар из корзины пользователя по id товара
        try {
            const {productId} = req.body
            const token = parseJwt(req.headers.authorization.split(' ')[1])
            const email = token.email
            const user = await User.findOne({where: {email}})
            const userId = user.id
            const user_cart = await Cart.findOne({where: {userId}})
            const new_good = await CartProduct.findOne({where: {cartId: user_cart.id, productId: productId}})
            new_good.destroy()
            return res.json({})
        } catch (e) {
            next (ApiError.badRequest(e.message))
        }
    }

    async get_cart_content(req, res, next) { // возвращает все товары соответствующие id пользователя
        try {
            const email = (parseJwt(req.headers.authorization.split(' ')[1])).email
            const userId = (await User.findOne({where: {email}})).id
            const cartId = (await Cart.findOne({where: {userId}})).id
            const goods = await CartProduct.findAll({where: {cartId}})
            return res.json({goods})


        } catch (e) {
            next (ApiError.badRequest(e.message))
        }
    }


    async update_user_email(req, res, next) {
        try {
            const {password, new_email} = req.body
            let token = req.headers.authorization.split(' ')[1]
            let email = parseJwt(token).email
            let user = await User.findOne({where: {email}})
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal("Wrong password!"))
            }
            await db.query(`UPDATE users SET email = '${new_email}' where email = '${email}'`); //SQLi
            email = new_email
            user = await User.findOne({where: {email}})
            token = generateJWT(user.id, user.email, user.role)
            return res.json({token})
        } catch (e) {
            next (ApiError.badRequest(e.message))
        }
    }

    async forgot_password_message(req, res, next) {
        try {
            const email = req.query.email
            console.log(email)
            const hash = await bcrypt.hash(email, 5)
            await MailUser.update({restore_hash: hash}, {where: {email: email}})
            const link = "http://localhost:7000/change-password?user=" + hash
            await sendMessage(email, 'TheImpossibleSuppot@noreply.com', "Похоже, что Вы забыли свой пароль, воспользуйтесь ссылкой для изменения пароля: " + link)
            return res.json({link})
        } catch (e) {
            next (ApiError.badRequest(e.message))
        }
    }

    async change_user_password(req, res, next) {
        try {
            const user_hash = req.query.user
            const user = await MailUser.findOne({where: {restore_hash: user_hash}})
            if (!user) {
                return res.status(404).json({message: "Пользователь не найден!"})
            }
            const email = user.email
            console.log(user)
            const new_password = req.body.new_password
            const hashPassword = await bcrypt.hash(new_password, 5)
            await User.update({password: hashPassword}, {where: {email: email}})
            await MailUser.update({restore_hash: "None"}, {where: {email: email}})
            let msg = "Password changed for user: " + email
            return res.json({msg})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()