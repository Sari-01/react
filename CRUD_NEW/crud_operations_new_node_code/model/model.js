const mongoose=require('mongoose')
const details=mongoose.Schema({
    "Id":Number,
    "Name":String,
    "Class":Number,
    "Address":String,
    "PhoneNumber":Number
})

module.exports=mongoose.model('react_crud',details)