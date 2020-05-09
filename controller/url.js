const shortid = require('shortid');
const url1=require('../models/urlmodel');

module.exports = {
    get:{
       url:async(req,res)=>{
           temp=req.session.userid
           let data=await url1.find({userid:temp})
           await console.log(data)
           await res.render('data',{data})
       },
       url1:async(req,res)=>{
           temp=`https://attainu-tiny-url.herokuapp.com/url/${req.params.url}`
           let data=await url1.find({newurl:temp})
           console.log(data)
           data[0].count+=1
           await data[0].save()
           let redirect_url=data[0]['previousurl']
           console.log(redirect_url)
           res.redirect(redirect_url)
       } 

    },
    post:{
        url:async(req,res)=>{
            url=req.body.url
            user=req.session.userid
            temp=`https://attainu-tiny-url.herokuapp.com/url/${shortid.generate()}`
            user123={
                userid:user,
                previousurl:url,
                newurl:temp,
                count:0
            }
            const newuser = await url1.create(user123)
            await console.log(newuser)            
            res.redirect('/url')
        }
    }
}