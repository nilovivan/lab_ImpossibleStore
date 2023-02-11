const Router = require('express')
const router = new Router()
const ProductRouter = require('../controllers/productController')

router.post('/',)
router.get('/',)
router.get('/:id', ProductRouter.getAll)

module.exports = router
