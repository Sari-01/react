const Joi=require('joi')

const expenseValidation=Joi.object({
    userId:Joi.string().required()
            .messages({
                "String.empty":"UserId is required"
            }),
    title:Joi.string().required()
            .messages({
                "String.empty":"Title cannot be required"
            }),
    amount:Joi.string().required()
            .messages({
                "number.base":"Amount should be number",
                "number.positive":"Amount cannot be negative",
                "any.required":"Amount is required"
            }),
    date:Joi.string().required()
            .messages({
                "date.base":"Date must be in a valid format",
                "any.required":"Date is required"
            })
})

module.exports=expenseValidation