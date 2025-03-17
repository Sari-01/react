const joi = require('joi')

const validationDetails = joi.object({
    Name: joi.string().required()
        .pattern(/^[A-Za-z\s]+$/)  // Only allow letters and spaces
        .messages({
            "string.empty": "Name is required and cannot be empty",
            "string.pattern.base": "Name can only contain letters and spaces"
        }),
    Gender: joi.string().required()
        .valid('Male', 'Female', 'Others')
        .messages({
            "string.empty": "Gender is required and cannot be empty",
            "any.only": "Gender must be Male,Female or Others"
        }),
    PhoneNumber: joi.string().required()
        .min(10)
        .messages({
            "string.empty": "Phone number is required and cannot be empty",
            "string.base": "Phone numbers should be a string",
            "string.min": "Phone number should be in valid format(min 10)",
        }),
    Date_Of_Birth: joi.date().required()
        .messages({
            "date.base": "Date of birth must be a valid date",
            "any.required": "Date of birth is required"
        }),
    // Password: joi.string().required()
    //     .min(6)
    //     .messages({
    //         "string.min": "Password must have length of 6 characters",
    //         "string.empty": "Password cannot be empty"
    //     }),
    Country: joi.string().required()
        .valid("India",
            "United States",
            "Canada",
            "United Kingdom",
            "Germany",
            "France",
            "Australia",
            "Japan",
            "China",
            "Russia",
            "Brazil")
        .messages({
            "any.only": "Choose only from the allowed countries"
        }),
    Address: joi.string().required()
        .min(10).max(300)
        .messages({
            "string.min": "Address must have atleast 10 characters",
            "string.max": "Address must hold only 300 characters",
            "string.empty": "Address is empty"
        }),

    Email: joi.string()
        // .email({ tlds: { allow: ['com', 'org'] } })
        // this is like allowing the email ending with com and org
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.email": "Please provide a valid email address",
            "string.empty": "Email is required.",
        }),

})

const resettingPassword = joi.object({
    NewPassword: joi.string().required()
        .min(10)
        .max(20)
        .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/)
        .messages({
            "string.min": "Password must have 10 characters",
            "string.empty": "Password is required",
            "string.pattern.base": "Password must include atleast one uppercase letter and one special character"
        })
})

module.exports = { validationDetails, resettingPassword }