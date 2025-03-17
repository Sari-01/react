const express = require('express')
const router = express.Router()
const { validationDetails, resettingPassword } = require('../validation/detailsValidation')
const user_details = require('../model/model')
const counter = require('../model/counter')
const bcrypt = require('bcrypt')
const { randomPassword } = require('../required/generating_password')
const { sendMail } = require('../required/email')


router.post('/signup', async (req, res) => {
    let tempPasssword = randomPassword()
    let userId
    const { error } = validationDetails.validate(req.body, { abortEarly: false })
    // the abortEarly is used to show all the error messages that are done using joi validation.
    //Setting abortEarly to false will help to give all error messages of all fields, setting to true will list only the first message
    // the error variable is set as object because we are listing every fields error messages as abortEarly is set to false

    console.log(error)
    // if (error) {
    //     console.log(error)
    //     return res.status(400).json({
    //         errors: error.details.map((err) => err.message)
    //     })
    // }
    // error.details--> the details is default created by itself we used that here.
    // we used map just to take the error messages alone else it will give all fields like path,type,context(check console)

    try {
        if (error) {
            console.log("!!!!!!", error.details)
            return res.status(400).json({
                errors: error.details.map((err) => err.message)
            })
        }

        const counter_check = await counter.findOneAndUpdate(
            { fieldName: 'UserId' },
            { $inc: { count: 1 } },
            { new: true, upsert: true }
        )
        console.log(counter_check)
        if (counter_check) {
            counter_check.count = 0
            userId = `UD${String(counter_check.count).padStart(2, '0')}`; // Formats as UD01, UD02, etc.
        } else {
            return res.status(500).json({ message: "Failed to generate User ID" });
        }

        const msg = new user_details({
            UserId: userId,
            Name: req.body.Name,
            Gender: req.body.Gender,
            PhoneNumber: req.body.PhoneNumber,
            Date_Of_Birth: req.body.Date_Of_Birth,
            Password: tempPasssword,
            Country: req.body.Country,
            Address: req.body.Address,
            Email: req.body.Email
        })
        await msg.save()
            .then((data) => {
                sendMail(msg.Email, tempPasssword, msg.Name, msg.UserId)
                return res.status(201).json({ message: "Successfully signed up", Details: data })
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json({ message: "Error while signing up", Error: err })
            })
    }
    catch (err) {
        console.log("ffff", err)
        return res.status(400).json({ messsage: "Error", Error: err })
    }

    //     For your current implementation, you don't need a manual check for UserId because:

    // It is auto-generated.
    // MongoDB enforces uniqueness.
    // The catch block handles any issues.
})


// router.post('/login', async (req, res) => {
//     user_details.findOne({ UserId: req.body.UserId })
//         .then((data) => {
//             if (!data) {
//                 return res.status(409).json({ message: "User not found. Kindly signup then login" })
//             }
//             else if (!(req.body.UserId === data.UserId && req.body.Password === data.Password)) {
//                 return res.status(409).json({ message: "Invalid credentials to set the password" })
//             }
//             else if (req.body.UserId === data.UserId || req.body.password === data.Password) {
//                 return res.status(200).json({ message: "Alert: Kindly change the password which includes minimum 10 characters including special characters and one captial letter in it!!!" })
//             }
//         })
//         .catch((err) => {
//             return res.status(400).json({ message: "Error!!!", err })
//         })
// })

router.post('/login', async (req, res) => {
    try {
        const { UserId, Password } = req.body;

        // Check if user exists
        const user = await user_details.findOne({ UserId });
        if (!user) {
            return res.status(409).json({ message: "User not found. Kindly signup then login" });
        }

        // Compare passwords using bcrypt
        const isPasswordValid = await bcrypt.compare(Password, user.Password);

        if (isPasswordValid) {
            // return res.status(409).json({ message: "Invalid credentials to set the password" });
            // If all checks pass
            return res.status(200).json({ message: "Login successful" });
        }

        // Check if password needs to be updated
        if (Password === user.Password) {
            return res.status(200).json({
                code: 200,
                message: "Alert: Kindly change the password which includes minimum 10 characters, including special characters and one capital letter!"
            });
        }

        // If all checks pass
        // return res.status(200).json({ message: "Login successful" });
        return res.status(409).json({ message: "Invalid credentials to set the password" });
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(400).json({ message: "Error!!!", error: err.message });
    }
});


router.post('/resetPassword', async (req, res) => {
    try {
        const { UserId, NewPassword } = req.body
        const { error } = resettingPassword.validate({ NewPassword }, { abortEarly: false })
        if (error) {
            console.log(error)
            return res.status(400).json({
                errors: error.details.map((err) => err.message)
            })
        }
        const hashedPassword = await bcrypt.hash(NewPassword, 10)
        const updateUser = await user_details.findOneAndUpdate({
            UserId: req.body.UserId
        }, {
            $set: {
                Password: hashedPassword
            }
        }, { new: true })
        if (!updateUser) {
            return res.status(400).json({ message: "User not found! Kindly signup and login again to reset the password" })
        }
        return res.status(200).json({ message: "Password updated successfully" })
    }
    catch (err) {
        console.error("Error:", err)
        return res.status(500).json({ message: "An error occured" })
    }
})

module.exports = router;
