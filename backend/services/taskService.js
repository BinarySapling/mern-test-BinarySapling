const Task = require('../models/Task');

const createTask = async (data) => {
  return await Task.create(data);
};

const getTasks = async (userId, page = 1, limit = 10, status) => {
  const query = { createdBy: userId };
  if (status) query.status = status;
  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const count = await Task.countDocuments(query);
  return { tasks, count };
};

const updateTask = async (id, data, userId) => {
  return await Task.findOneAndUpdate(
    { _id: id, createdBy: userId },
    data,
    { new: true }
  );
};

const deleteTask = async (id, userId) => {
  return await Task.findOneAndDelete({ _id: id, createdBy: userId });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };