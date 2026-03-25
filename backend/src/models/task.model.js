const pool = require("../utils/db");

const createTask = async ({ title, description, user_id }) => {
  const result = await pool.query(
    `INSERT INTO tasks (title, description, user_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, description, user_id]
  );

  return result.rows[0];
};

const getTasksByUser = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM tasks WHERE user_id = $1`,
    [user_id]
  );

  return result.rows;
};

const getAllTasks = async () => {
  const result = await pool.query(`SELECT * FROM tasks`);
  return result.rows;
};

const getTaskById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM tasks WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

const updateTask = async (id, { title, description, status }) => {
  const result = await pool.query(
    `UPDATE tasks
     SET title = $1, description = $2, status = $3
     WHERE id = $4
     RETURNING *`,
    [title, description, status, id]
  );

  return result.rows[0];
};

const deleteTask = async (id) => {
  await pool.query(`DELETE FROM tasks WHERE id = $1`, [id]);
};

module.exports = {
  createTask,
  getTasksByUser,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};