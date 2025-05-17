const mongoose=require('mongoose')

const addsongschema =new mongoose.Schema({
    title:{type:String,required:true},
    genre:{type:String,required:true},
    singer:{type:String,required:true},
    image:{type:String,required:true},
    songUrl:{type:String,required:true},

})

module.exports=mongoose.model('songs',addsongschema)