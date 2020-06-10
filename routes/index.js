const express = require('express')
const db = require('../db/db')
const moment = require('moment')

const router = express.Router()

router.get('/api/todos', (req, res) => {
    if(db.length > 0){
        res.status(200).send({
            success: 'true',
            messege: `todos  in list (${db.length})`,
            todos: db,
        })
    }else{
        res.status(200).send({
            success: 'true',
            messege: 'todos not found',
        })
    }
})

router.get('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    db.map((todo) => {
        if(todo.id === id){
            return res.status(200).send({
                success: 'true',
                todo,
            })
        }
    })
})

router.post('/api/todos', (req, res) => {
    if(!req.body.title){
        return res.status(400).send({
            success: 'false',
            messege: 'title is required',
        })
    }else if(!req.body.description){
        return res.status(400).send({
            success: 'false',
            messege: 'title is required',
        })
    }

    const todo = {
        id: db.length + 1,
        title: req.body.title,
        description: req.body.description,
        Created: moment().format('LLL')
    }
    db.push(todo)

    return res.status(201).send({
        success: 'true',
        messege: 'todo added successfully',
    })
})

router.put('/api/todos/:id', (req, res) => {
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
        message: 'todo not found',
      });
    }
  
    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      })
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required',
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
      message: 'todo updated successfully',
    })
})

router.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)

    db.map((todo, index) => {
      if (todo.id === id) {
        db.splice(index, 1)
        return res.status(200).send({
          success: 'true',
          message: 'todo deleted successfully',
        })
      } 
    })

    return res.status(404).send({
      success: 'false',
      message: 'todo not found',
    })
})

module.exports = router