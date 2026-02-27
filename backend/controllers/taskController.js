const asyncHandler = require('express-async-handler');
const { createTask, getTasks, updateTask, deleteTask } = require('../services/taskService');

const create = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;
  if (!title) {
    res.status(400);
    throw new Error('Title is required');
  }
  const task = await createTask({
    title,
    description,
    status,
    createdBy: req.user._id,
  });
  res.status(201).json({ success: true, task });
});

const getAll = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const { tasks, count } = await getTasks(req.user._id, Number(page), Number(limit), status);
  res.status(200).json({ success: true, tasks, count });
});

const update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await updateTask(id, req.body, req.user._id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  res.status(200).json({ success: true, task });
});

const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await deleteTask(id, req.user._id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  res.status(200).json({ success: true });
});

module.exports = { create, getAll, update, remove };