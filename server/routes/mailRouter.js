const Router = require('express')
const router = new Router()
const mailRouter = require('../controllers/mailController')
const authMiddleware = require('../middleware/authMiddleware')

router.use(Router.json())
router.post('/register', mailRouter.registration)
router.post('/login', mailRouter.login)
router.get('/', authMiddleware,  mailRouter.get_emails)
router.get('/auth', authMiddleware, mailRouter.check)
router.post('/send-email', authMiddleware, mailRouter.send_email)
router.get('/:id', authMiddleware, mailRouter.getOne)

module.exports = router