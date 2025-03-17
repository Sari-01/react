const Joi = require('joi')

const validations = Joi.object({
    name: Joi.string().required()
        .pattern(/^[A-Za-z\s]+$/)
        .messages({
            "string.empty": "Name is required and it cannot be empty",
            "string.pattern.base": "Name can only contain letters and spaces"
        }),
    email: Joi.string().required()
        .email({ tlds: { allow: false } })
        .messages({
            "string.email": "Please provide a valid email address",
            "string.empty": "Email is required"
        }),
    password: Joi.string().required()
        .min(6)
        .messages({
            "string.min": "Password must have length of 6 characters minimum",
            "string.empty": "Password cannot be empty"
        })
})

module.exports = validations;