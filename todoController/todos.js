const db = require('../db/db')
const moment = require('moment')
const models = require('../models')

class TodosController {
  getTodos(req, res) {
    if(db.length > 0){
      res.status(200).send({
        success: 'true',
        message: `Todos  in array (${db.length})`,
        todos: db,
      })
    }else{
      res.status(400).send({
        success: 'false',
        message: 'Array is empty',
      })
    }
  }
  
  getSingleTodo(req, res) {
    const id = parseInt(req.params.id, 10)
    db.map((todo) => {
      if(todo.id === id){
        return res.status(200).send({
          success: 'true',
          todo,
        })
      }else{
        res.status(400).send({
          success: 'false',
          message: `Cant find todo with id ${id}`,
        })
      }
    })
  }
  
  createTodo(req, res) {
    if(!req.body.title){
      return res.status(400).send({
        success: 'false',
        message: 'Title is required',
      })
    }else if(!req.body.description){
      return res.status(400).send({
        success: 'false',
        message: 'Description is required',
      })
    }

    const todo = {
      id: db.length + 1,
      title: req.body.title,
      description: req.body.description,
      created: moment().format('LLL')
    }
    db.push(todo)

    return res.status(201).send({
      success: 'true',
      message: 'Todo added successfully',
    })

    // const todo = {
    //   title: req.body.title,
    // }

    // models.Todo.create(todo).then((todo) => {
    //   return res.status(201).send({
    //     success: 'true',
    //     message: 'todo added successfully',
    //   })
    // })
  }
  
  updateTodo(req, res) {
    const id = parseInt(req.params.id, 10)
    let todoFound
    let itemIndex
  
    db.map((todo, index) => {
      if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
      }
    })
    
    if (!todoFound) {
      return res.status(404).send({
        success: 'false',
        message: 'Todo not found',
      });
    }
  
    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'Title is required',
      })
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'Description is required',
      })
    }
  
    const updatedTodo = {
      id: todoFound.id,
      title: req.body.title || todoFound.title,
      description: req.body.description || todoFound.description,
      modified: moment().format('LLL'),
    }
    
    db.splice(itemIndex, 1, updatedTodo)
    
    return res.status(201).send({
      success: 'true',
      message: 'Todo updated successfully',
    })
  }
  
  deleteTodo(req, res) {
    const id = parseInt(req.params.id, 10)

    db.map((todo, index) => {
      if (todo.id === id) {
        db.splice(index, 1)
        return res.status(200).send({
          success: 'true',
          message: 'Todo deleted successfully',
        })
      } 
    })

    return res.status(404).send({
      success: 'false',
      message: 'Todo not found',
    })
  }
}

const todoController = new TodosController()
module.exports = todoController