const { string } = require('joi')
const mongoose = require('mongoose')
const details = mongoose.Schema({
    UserId: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    Gender: {
        type: String,                  // The field type is a string
        required: true,                // The field is required
        enum: ["Male", "Female", "Other"], // Allowed values for gender
        default: "female",             // Default value if not provided
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    Date_Of_Birth: {
        type: Date,
        required: true
    },
    Password: {
        type: String,
        required: true,
        minlength: 6
    },
    Country: {
        type: String,
        required: true, // Ensure the field is mandatory
        enum: [
            "India",
            "United States",
            "Canada",
            "United Kingdom",
            "Germany",
            "France",
            "Australia",
            "Japan",
            "China",
            "Russia",
            "Brazil",
            // Add more countries as needed
        ],
    },
    Address: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 300
    },
    Email: {
        type: String,
        required: true,
    }
})
module.exports = mongoose.model('detail', details)