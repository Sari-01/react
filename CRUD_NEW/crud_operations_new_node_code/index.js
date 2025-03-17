const express=require('express')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const cors=require('cors')
const app=express()
const routes=require("./routes/routes")

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors())

mongoose.Promise=global.Promise;

app.use('/routes',routes);

const uri="mongodb+srv://Sariha:Sabarish15*@cluster0.rdbdb.mongodb.net/react_crud_operation?retryWrites=true&w=majority"; //mongo db connection

mongoose.connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,  // Recommended option for avoiding deprecation warnings
  }).then(() => {
    console.log("MongoDB connected successfully.");
  }).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.listen('8000',()=>
{
    console.log("Listening at port 8000")
})