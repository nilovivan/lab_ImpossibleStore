const ApiError = require('../error/ApiError') //подгружаем кастомные ошибки

class UserController {
    async registration(req, res) {

    }

    async check(req,res, next) {
        const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest('ID required'))
        }
        res.json(id)
    }
}

module.exports = new UserController()