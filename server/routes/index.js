const Router = require('express');
const router = new Router();
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const mailRouter = require('./mailRouter');

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/mail', mailRouter)

module.exports = router
