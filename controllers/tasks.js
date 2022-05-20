const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const { createCustomError} = require('../errors/custom-error')
const getAllTasks = asyncWrapper( async (req, res) => {
    
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
        
        //  res.status(200).json({ tasks, amount: tasks.length })
        // res.status(200).json({
        //     status: "sucess", data: {
        //         tasks, nbHits: tasks.length
        //     }
        // })

})

const createTask = asyncWrapper( async (req, res) => {
 
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    
})
const getSingleTask = asyncWrapper( async (req, res) => {
   
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })
        if (!task) {
            return next(createCustomError('Not Found', 404))

        } else {

            res.status(200).json({ task })
        }
})
const deleteTask = asyncWrapper( async (req, res) => {
   
        const { id: taskID } = req.params;
        const task = await Task.findOneAndRemove({ _id: taskID })
        if (!task) {
            return next(createCustomError('Not Found', 404))
        } else {
            res.status(200).json({ task })
        }


})

const updateTask = asyncWrapper( async (req, res, next) => {

        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true
        })
        if (!task) {
            return next(createCustomError('Not Found', 404))
        } else {
            res.status(200).json({ task })
        }
    
    console.log(res.send('update task'))
})
module.exports = { getAllTasks, createTask, getSingleTask, updateTask, deleteTask }