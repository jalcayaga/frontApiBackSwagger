import Task from '../models/task.model.js';

// Retrieving all tasks
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
// Retrieving a single task
export const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
// Creating a task
export const createTask = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
// Updating a task
export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    task.title = title;
    task.description = description;
    await task.save();

    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
// Deleting a task
export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    await task.destroy();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
