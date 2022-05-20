const express = require('express');
const router = express.Router();
const {getAllTasks, createTask, deleteTask, getSingleTask, updateTask} = require('../controllers/tasks')
// /api/v1/tasks
router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask)

module.exports = router;