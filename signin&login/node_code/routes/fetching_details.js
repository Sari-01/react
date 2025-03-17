// Fetch all countries (this assumes countries are stored in the enum)
const user_details = require('../model/model')
const express = require('express')
const router = express.Router()

router.get('/countries', (req, res) => {
    const countries = user_details.schema.path('Country').enumValues;
    res.json(countries);
});

module.exports = router;