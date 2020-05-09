const express=require('express')
const router=express.Router()
const controller = require('../controller/user.js')
const authenticate=require('../middlewares/middleware.js')
const session=require('express-session')

//-------------------middleware
router.use(
    session({
      name: "sessionId",
      secret: "SomeBluffingSecret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 10,
        secure: false
      }
    })
  );
  //----------------end

//-------------------------------------------Get Request--------------------------------------------------------------

//-----------------------------Register

router.get('/register',authenticate.authenticate2,controller.get.createuser)

//-----------------------------login

router.get('/login',authenticate.authenticate2,controller.get.loginuser)

//-----------------------------register

router.get('/dashboard',authenticate.authenticate1,controller.get.dashboard)

//------------------------------logoutuser
router.get('/logout',function(req,res,next){
  if(!req.session.userid){
    var yahoo=`<script>
    alert("Please Login/Register first to Logout");
    window.location.href='/login'
    </script>`
    res.send(yahoo)
  }
  else{
    next()
  }
},controller.get.logoutuser)


//------------------------------------------post request----------------------------------------------------------

//------------------------------Register
router.post('/register',controller.post.createuser)

//...............................login
router.post('/login',controller.post.loginuser)





module.exports = router