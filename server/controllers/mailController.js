const ApiError = require('../error/ApiError');
const {MailUser, Message, Product, User} = require('../models/models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const generateJWT = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '2h'}
    )
}

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

class MailController {

    async get_emails(req, res, next) {
        try {
            let token = req.headers.authorization.split(' ')[1]
            let email = parseJwt(token).email
            let user = await MailUser.findOne({where: {email}})
            const userId = user.id
            res.json(await Message.findAll({where: {mailUserId: userId}})) //делать
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async send_email(email, from, text) { //Получаем все товары на странице
        try {
            console.log(email)
            const mailUserId = await MailUser.findOne({where: {email: email}})
            console.log(mailUserId.id)
            await Message.create({mailUserId: mailUserId.id, from: from, to: email, text: text})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) { //получаем письмо по айдишнику
        try {
            const {id} = req.params
            const message = await Message.findOne({where: {id}})
            return res.json(message)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async registration(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Wrong data'))
        }
        const candidate = await MailUser.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('User with this email already has an account!'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await MailUser.create({email, password: hashPassword})
        const token = generateJWT(user.id, user.email)
        return res.json({token})
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await MailUser.findOne({where: {email}})
            if (!user) {
                return next(ApiError.internal('User not found'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal('Wrong password!'))
            }
            const token = generateJWT(user.id, user.email)
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}


module.exports = new MailController()