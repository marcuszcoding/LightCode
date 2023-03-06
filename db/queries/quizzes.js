const db = require("../connection");

// CRUD - Create, Read, Update, Delete
const create = (newQuiz) => {
  const { owner_id, title, public_listed, url } = newQuiz;
  return db
    .query(
      "INSERT INTO quizzes (owner_id, title, public_listed, url) VALUES ($1, $2) RETURNING *;",
      [owner_id, title, public_listed, url]
    )
    .then((data) => data.rows[0]);
};

// Grabs all quizzes for home page
const getAll = () => {
  return db.query("SELECT * FROM quizzes;").then((data) => data.rows);
};

// Grabs all quizzes
const getById = (id) => {
  return db
    .query("SELECT * FROM quizzes WHERE id = $1;", [id])
    .then((data) => data.rows[0]);
};

// Grab all from quizzes table by owner_id
const getByUserId = (owner_id) => {
  return db
    .query("SELECT * FROM quizzes WHERE owner_id = $1;", [owner_id])
    .then((data) => data.rows);
};
// Update quizzes table
const update = (updatedQuiz) => {
  const { owner_id, title, public_listed, url } = updatedQuiz;
  return db
    .query("UPDATE quizzes SET owner_id = $1 WHERE id = $2 RETURNING *;", [
      owner_id,
      title,
      public_listed,
      url,
    ])
    .then((data) => data.rows[0]);
};

const remove = (id) => {
  return db
    .query("DELETE FROM quizzes WHERE id = $1;", [id])
    .then((data) => data.rows);
};

module.exports = { create, getAll, getById, getByUserId, update, remove };
