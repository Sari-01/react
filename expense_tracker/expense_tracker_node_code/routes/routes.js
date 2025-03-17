const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')
const expenseController=require('../controller/expenseController')

router.post('/signup',userController.signup)

router.post('/login',userController.login)

// expenses api starts here
router.post('/expenses/add',expenseController.addExpense)
router.get('/expenses/all',expenseController.getAllExpense)
router.get('/expenses/:id',expenseController.getExpenseById)
router.put('/expense/:id',expenseController.updateExpense)
router.delete('/expense/:id',expenseController.deleteExpense)

module.exports=router;