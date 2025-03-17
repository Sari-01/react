const express = require('express')
const model = require('../model/model')
const router = express.Router()

router.post("/create", async (req, res) => {
    if (!req.body.Id || !req.body.Name || !req.body.Class || !req.body.Address || !req.body.PhoneNumber) {
        console.log("LLLLL")
        return res.send({ code: 400, msg: "All fields required!" })
    }
    const msg = new model({
        Id: req.body.Id,
        Name: req.body.Name,
        Class: req.body.Class,
        Address: req.body.Address,
        PhoneNumber: req.body.PhoneNumber
    })
    await model.findOne({ Id: msg.Id })
        .then((data) => {
            // console.log(data)
            if (data == null) {
                msg.save()
                    .then((data) => {
                        return res.send({ code: 200, msg: "Successfully added" })
                    })
                    .catch((err) => {
                        return res.send({ code: 400, msg: "Error in storing ", err })
                    })
            }
            else {
                return res.send({ code: 400, msg: "Already the user with same ID exists" })
            }
        })
        .catch((err) => {
            return res.send({ code: 400, msg: "Error ", err })
        })
})

router.put('/update', (req, res) => {
    model.findOneAndUpdate(
        { Id: req.body.Id },
        {
            $set: {
                Name: req.body.Name,
                Class: req.body.Class,
                Address: req.body.Address,
                PhoneNumber: req.body.PhoneNumber
            }
        }, { new: true }
    )
        .then((data) => {
            res.send({ code: 200, msg: "Successfully updated" })
        })
        .catch((err) => {
            res.send({ code: 400, msg: "Error in updation", err })
        })
})

router.delete('/delete',(req,res)=>
{
    model.findOneAndDelete({Id:req.body.Id})
    .then((data)=>
    {
        return res.send({code:200, msg:"Deleted successfully"})
    })
    .catch((err)=>
    {
        return res.send({code:400, msg:"Error in deleting",err})
    })
})

router.get('/get_all', (req, res) => {
    model.find().sort({ Id: 1 })
        .then((data) => {
            return res.send({ code: 200, msg: data })
        })
        .catch((err) => {
            return res.send({ code: 400, msg: err })
        })
})

module.exports = router
