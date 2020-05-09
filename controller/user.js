var bcrypt=require('bcrypt')
var mongoose=require('mongoose')
var users=require('../models/usermodel')



module.exports={
    get:{
    //All get request
    createuser:function(req,res){
        res.render('register.hbs')
    },
    loginuser:function(req,res){
        res.render('login.hbs')
    },
    dashboard:function(req,res){
        res.render('landing.hbs')
    },
    createblog:function(req,res){
        res.render('createBlog.hbs')
    },
    updateblog:function(req,res){
        res.render('updateBlog.hbs')
    },
    logoutuser:function(req,res){
        req.session.destroy();
        res.render('logout.hbs')
    },

 },post:{
     createuser:function(req,res){
         var temp = req.body
         var hashed=undefined
         console.log(temp)
         bcrypt.hash(temp.password, 10, function(err, hash) {
            // Store hash in your password DB.
            if(err){console.log(err)}
            else{
                hashed=hash;
            }
        });
        setTimeout(function(){
            // console.log(hashed)
            temp.password=hashed
            // console.log(temp)
            var newuser = new users({...temp})
            newuser.save().then(function(newfish){
                console.log(newfish)
                req.session.userid=newfish._id
                var a = `<script>
                            alert('Registeration Successfull');
                            window.location.href='/dashboard';
                            </script>`
                            res.send(a)
                            return 1
            }).catch(function(err){
                console.log(err.message)
                if (err.name === "ValidationError")
                  return res.status(400).send(`Validation Error: ${err.message}`);
                return res.status(500).send("Server Error");
            })
        },2000);
     },
     loginuser:function(req,res){
        //  console.log(req.body)
         var val=req.body
         console.log(val)
         users.find({email:val.email}).then(function(data){
            console.log(data)
            if(data.length==0){
                var a = `<script>
                            alert('Sorry Either username or password is incorrect');
                            window.location.href='/login';
                            </script>`
                            res.send(a)
                            return 1
            } 
            var hashed=data[0].password
                console.log(hashed)
                bcrypt.compare(val.password,hashed, function(err, result) {
                    if(err){console.log(err)}
                    else{
                        // result == true
                        console.log(result)
                        if(result==true){
                            console.log(data[0]._id)
                            req.session.userid=data[0]._id
                            res.redirect('/dashboard');
                            return
                        }
                        else{
                            var a = `<script>
                            alert('Sorry Either username or password is incorrect');
                            window.location.href='/login';
                            </script>`
                            res.send(a)
                        }
                    }
                });
            
            }).catch(function(err){
             console.log(err.message)
         })
     }
 }



}