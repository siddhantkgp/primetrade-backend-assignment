const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  createTaskHandler,
  getTasksHandler,
  getTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
} = require("../controllers/task.controller");

router.use(authMiddleware);

router.post("/", createTaskHandler);
router.get("/", getTasksHandler);
router.get("/:id", getTaskHandler);
router.put("/:id", updateTaskHandler);
router.delete("/:id", deleteTaskHandler);

module.exports = router;