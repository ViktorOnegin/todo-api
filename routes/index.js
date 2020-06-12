const express = require('express')
const todoController = require('../todoController/todos')

const router = express.Router()

router.get('/todos/getAll', todoController.getTodos)
router.get('/todos/getByID/:id', todoController.getSingleTodo)
router.post('/todos/create', todoController.createTodo)
router.put('/todos/update/:id', todoController.updateTodo)
router.delete('/todos/delete/:id', todoController.deleteTodo)

module.exports = router