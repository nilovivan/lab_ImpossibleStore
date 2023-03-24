const Router = require('express')
const router = new Router()
const mailRouter = require('../controllers/mailController')

router.use(Router.json())
router.post('/register', mailRouter.registration)
router.post('/login', mailRouter.login)
router.get('/', mailRouter.get_emails)
router.post('/send-email', mailRouter.send_email)
router.get('/:id', mailRouter.getOne)

module.exports = router