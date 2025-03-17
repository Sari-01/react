const  validations  = require('../validation/userValidations')
const user_model = require('../models/user_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    const { name, password, email } = req.body

    // step 1 : validate the inputs

    const { error } = validations.validate(req.body, { abortEarly: false })
    console.log("Errors in validation",error)

    if (error) {
        return res.status(400).json({
            errors: error.details.map((err) => err.message)
        })
    }

    try {
        // 2. to check the user exists or not
        const user_exists = await user_model.findOne({ email })
        // In JavaScript, if the property name and value name are the same, you can use shorthand syntax
        // the shorthand syntax is await user_model.findOne({email})---> that email variable here is used same for property and value, so js accepts to take as shorthand syntax
        if (user_exists) {
            return res.status(400).json({ message: "Email already existing" })
        }
        // 3. hash the password while saving using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)
        // 4.creating new user in the user model
        const msg = new user_model({
            name,
            email,
            password: hashedPassword
        })
        // 5. save those details in db
        await msg.save()
        // 6. return the response
        return res.status(201).json({ message: "Successfully created the user" })
    }
    catch (err) {
        console.log("Error while creating ", err)
        return res.status(500).json({ message: "Error in creating user" })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const { error } = validations.validate(req.body, { abortEarly: false })

    try {
        if (error) {
            return res.status(400).json({
                errors: error.details.map((err) => err.message)
            })
        }

        const user_exists = await user_model.findOne({ email })
        if (!user_exists) {
            return res.status(400).json({ message: "Entered email is not existing" })
        }
        const validPassword = await bcrypt.compare(password, user_exists.password)
        if (!validPassword) {
            return res.status(400).json({ message: "Entered password is incorrect" })
        }

        const token = jwt.sign({
            id: user_exists.id, email: user_exists.email
        },
            process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        return res.status(200).json({
            message: "Login successfully done",
            token,
            user: {
                id: user_exists.id,
                email: user_exists.email,
                name: user_exists.name
            }
        })
    }
    catch (err) {
        console.log("Error", err)
        return res.status(400).json({ message: "Server Error", error: err.message })
    }
}