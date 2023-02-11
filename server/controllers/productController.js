const uuid = require('uuid') //генерит рандомные имена для файоа
const path = require('path');
const {Product} = require('../models/models')
const ApiError = require('../error/ApiError') //подгружаем кастомные ошибки

class ProductController {
    async create(req, res, next) { //Функция для пост запроса с созданием нового товара
        try {
            const {name, price, description} = req.body //подгружаем с запроса данные
            const {img} = req.files //подгружаем файл с картинкой
            let fileName = uuid.v4() + ".jpg" //задаем имя картинки через uuid
            await img.mv(path.resolve(__dirname, '..', 'static', fileName)) // закидываем картинку в статику
            // создаем продукт с полученными параметрами
            const product = await Product.create({name, price, description, img: fileName})

            res.json(product) //возвращаем ответ
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) { //Получаем все товары на странице
        // Определяем количество товаров на странице, дефолт первая страница и лимит 9 товаров
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
        products = await Product.findAndCountAll({limit, offset})
        return res.json(products)
    }

    async getOne(req, res) { //получаем товар по айдишнику
        const {id} = req.params
        const product = await Product.findOne({
            where: {id}
        })
        return res.json(product)
    }
}

module.exports = new ProductController()