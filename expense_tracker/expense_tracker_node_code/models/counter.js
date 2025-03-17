const mongoose=require('mongoose')

const counterSchema=mongoose.Schema({
    fieldName:{
        type:String,
        required:true,
        unique:true
    },
    counter:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model('Counter',counterSchema)