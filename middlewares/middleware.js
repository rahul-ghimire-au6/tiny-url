
module.exports = {
authenticate1:function(req,res,next){
    if(!req.session.userid){
        res.redirect('/login')
    }
    else{
        next()
    }
},
authenticate2:function(req,res,next){
    if(req.session.userid){
        var a = `<script>
        alert('You are already Logged IN');
        window.location.href='/';
        </script>`
        res.send(a) 
    }
    else{
        next()
    }
}
}

