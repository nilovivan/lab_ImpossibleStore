const Router = require('express')
const router = new Router() //объект роутера
const userController = require('../controllers/userController') //подгрудаем контроллер
const authMiddleware = require('../middleware/authMiddleware')

// прописываем пути
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.post('/change-email', authMiddleware, userController.update_user_email)
router.post('/discount', userController.discount)
router.post('/add-product-to-cart', authMiddleware, userController.add_product)
router.delete('/remove-product-from-cart', authMiddleware, userController.remove_product)
router.get('/cart-content', authMiddleware, userController.get_cart_content)
router.post('/reset-password', userController.forgot_password_message)
router.post('/change-password', userController.change_user_password)


module.exports = router