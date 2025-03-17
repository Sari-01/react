const expenseValidation = require('../validation/expenseValidations')
const expenseModel = require('../models/expense_model')
const counter = require('../models/counter')

exports.addExpense = async (req, res) => {

    // const { userId, title, amount, date } = req.body
    const { error } = expenseValidation.validate(req.body, { abortEarly: false })
    if (error) {
        return res.status(400).json({
            errors: error.details.map((err) => err.message)
        })
    }

    try {
        const counter_check = await expenseModel.findOneAndUpdate(
            { fieldName: "Expense" },
            { $inc: { counter: 1 } },
            { new: true, upsert: true }
        )
        const expenseId = `EXP-${counter_check.counter.toString().padStart(0, '6')}`

        const newExpense = new expenseModel({
            expenseId,
            userId: req.body.userId,
            title: req.body.title,
            amount: req.body.amount,
            date: req.bodu.date
        })
        await newExpense.save()
        return res.status(200).json({ messsage: "Expense added successfully", expense: newExpense })
    }
    catch (err) {
        console.log("Error in adding expense ", err)
        return res.status(401).json({ 'message': 'Error in creating expense', error: err })
    }

}

exports.getAllExpense = async (req, res) => {
    try {
        const expense = expenseModel.find()
        return res.status(200).json({ expense })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server Error", error: err.message })
    }
}

exports.getExpenseById = async (req, res) => {
    try {
        const expenseById = await expenseModel.findOne({ expenseId: req.body.expenseId })
        if (!expenseById) {
            return res.status(404).json({ message: "Expense not found" });
        }
        return res.status(200).json({ expense: expenseById });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server Error", error: err.message })
    }
}

exports.updateExpense = async (req, res) => {
    try {
        const { expenseId, title, amount, date } = req.body

        const updateExpense = await expenseModel.findOneAndUpdate({ expenseId: expenseId },
            {
                title: title,
                amount: amount,
                date: date
            }, { new: true }
        )
        if (!updateExpense) {
            return res.status(400).json({ message: "Expense Id does not exists" })
        }
        return res.status(200).json({ message: "Successfully updated", updatedExpense: updateExpense })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server Error", error: err })
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const deleteExpense = await expenseModel.findOneAndDelete({ expenseId: req.body.expenseId })
        if (!deleteExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        return res.status(200).json({ message: "Deleted successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server Error" });
    }
}