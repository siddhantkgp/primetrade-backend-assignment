const {
  createTask,
  getTasksByUser,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../models/task.model");

// CREATE
const createTaskHandler = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "Valid title is required" });
    }

    console.log("REQ USER:", req.user); 
    console.log("USER ID:", req.user.id); 

    const task = await createTask({
      title,
      description,
      user_id: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL (User vs Admin)
const getTasksHandler = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await getAllTasks();
    } else {
      tasks = await getTasksByUser(req.user.id);
    }

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ONE
const getTaskHandler = async (req, res) => {
  try {
    const task = await getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ownership check
    if (req.user.role !== "admin" && task.user_id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
const updateTaskHandler = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    if (status && !["pending", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const task = await getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== "admin" && task.user_id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updatedTask = await updateTask(req.params.id, req.body);

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
const deleteTaskHandler = async (req, res) => {
  try {
    const task = await getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== "admin" && task.user_id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await deleteTask(req.params.id);

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTaskHandler,
  getTasksHandler,
  getTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
};