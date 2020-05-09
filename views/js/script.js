console.log('connected')
for(var i=1;i<13;i++){
var yahoo = document.querySelector(`.buyp_id${i}`)

yahoo.addEventListener('click',function(event){
    console.log(event.target.id)
    
})
}