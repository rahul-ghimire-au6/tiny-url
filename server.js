const express=require('express')
const morgan=require('morgan')
const hbs=require('hbs')
const path=require('path')
const app=express()
const methodOverride = require("method-override");
const session = require('express-session')
const user=require('./routes/user')
const url=require('./routes/url')
require('./dbsetting')
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(user)
app.use(url)


//loading static filepath
app.use(express.static(path.join(__dirname,'views')))
//hbs setting
app.set('view engine', 'hbs');
// Registering hbs partials
hbs.registerPartials(path.join(__dirname, "views", "partials"));
//setting  default layout
app.set("view options", { layout: "main" });

app.get('/',function(req,res){
    res.render('landing.hbs')
})




var port=process.env.PORT || 8080;

app.listen(port,function(){
    console.log('server is listening at port: '+port)
})
