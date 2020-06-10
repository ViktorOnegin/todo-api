const express = require('express')
const db = require('../db/db')
const todoController = require('../todoController/todos')

const router = express.Router()

router.get('/api/todos', todoController.getTodos)
router.get('/api/todos/:id', todoController.getSingleTodo)
router.post('/api/todos', todoController.createTodo)
router.put('/api/todos/:id', todoController.updateTodo)
router.delete('/api/todos/:id', todoController.deleteTodo)

module.exports = router