const ApiError = require('../error/ApiError') //подгружаем кастомные ошибки
const bcrypt = require('bcrypt') //Хэшируем пароли для хранения в бд
const jwt = require('jsonwebtoken')
const {User, User_cart} = require('../models/models')

const generateJWT = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '2h'}
    )
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
        const cart = await User_cart.create({userId: user.id})
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
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
    }

    async check(req,res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()