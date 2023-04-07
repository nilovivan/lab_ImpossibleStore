const Router = require('express')
const router = new Router()
const ProductRouter = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'),ProductRouter.create)
router.delete('/:id', checkRole('ADMIN'), ProductRouter.remove)
router.get('/', ProductRouter.getAll)
router.get('/:id', ProductRouter.getOne)

module.exports = router
