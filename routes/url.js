const express=require('express')
const router=express.Router()
const user_controller = require('../controller/user.js')
const url_controller=require('../controller/url.js')
const authenticate=require('../middlewares/middleware.js')
const session=require('express-session')



router.get('/url/:url',url_controller.get.url1)
router.get('/url',authenticate.authenticate1,url_controller.get.url)
router.post('/url',authenticate.authenticate1,url_controller.post.url)







module.exports = router