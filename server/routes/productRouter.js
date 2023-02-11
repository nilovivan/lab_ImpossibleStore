const Router = require('express')
const router = new Router()
const ProductRouter = require('../controllers/productController')

router.post('/', ProductRouter.create)
router.get('/', ProductRouter.getAll)
router.get('/:id', ProductRouter.getOne)

module.exports = router
