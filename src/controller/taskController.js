const Task = require("../model/Task");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    let tasks = await Task.find();
    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No task found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Task found!",
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mesage: "Internal Server Error",
      error: error.message,
    });
  }
};

// get single task
exports.getTask = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    let task = await Task.findOne({ _id: id });
    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    res.status(200).json({
      success: true,
      message: "Task found",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Create task
exports.createTask = async (req, res) => {
  try {
    let task = await req.body;
    let created = await Task.create(task);
    if (!created)
      return res.status(400).json({
        success: false,
        message: "Task created failed",
      });
    return res.status(200).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
};

// update tasks
exports.updateTask = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    let task = await req.body;
    let updated = await Task.findOneAndUpdate(id, task, { new: true });

    if (!updated)
      return res.status(400).json({
        success: false,
        message: "Task not updated",
      });
    res.status(201).json({
      success: true,
      message: "Task updated",
      user: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete users
exports.deleteTask = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    let deleted = await Task.findOneAndRemove(id);
    if (!deleted)
      return res.status(400).json({
        success: false,
        message: "Task not deleted",
        error: error.message,
      });
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
