
const mongoose=require('mongoose')

const expenseSchema=new mongoose.Schema({
    expenseId:{
        type:String,
        unique:true,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    userId:{
        type:String,
        ref:'User',
        required:true
    },
})

module.exports=mongoose.model('Expense',expenseSchema)