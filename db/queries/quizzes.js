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

// Grabs all quizzes
const getAll = () => {
  return db.query("SELECT * FROM quizzes;").then((data) => data.rows);
};

// Grabs all quizzes
const getById = (id) => {
  return db
    .query("SELECT * FROM quizzes WHERE id = $1;", [id])
    .then((data) => data.rows[0]);
};

const getQuestionsById = (id) => {
  return db
    .query(
      `SELECT quiz_questions.*, quiz_answers.* as quizanswers
      FROM quiz_questions
      JOIN quizzes ON quizzes.id = quiz_questions.quiz_id
      JOIN quiz_answers ON quiz_answers.question_id = quiz_questions.id
      WHERE quiz_id = $1;`,
      [id]
    )
    .then((data) => data.rows);
};

const getPublicQuizzes = (id) => {
  return db
    .query(
      `
  SELECT * FROM quizzes WHERE id = $1 AND public_listed = true;
  `,
      [id]
    )
    .then((data) => data.rows[0])
    .catch((err) => err.message);
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
// Remove quizzes
const remove = (id) => {
  return db
    .query("DELETE FROM quizzes WHERE id = $1;", [id])
    .then((data) => data.rows);
};

/// CREATE QUIZ QUERIES /////

// Adds question to quiz-questions db - accepts an array
const createQuizQuestion = function (info) {
  return db
    .query(
      `
    INSERT INTO quiz_questions (quiz_id, question)
    VALUES ($1, $2)
    RETURNING *;`,
      info
    )
    .then((data) => data.rows)
    .catch((err) => err.message);
};

// Adds answers to quiz db - accepts an array
const createQuizAnswer = function (info) {
  return db
    .query(
      `
    INSERT INTO quiz_answers (question_id, answer, is_correct)
    VALUES ($1, $2, $3)
    RETURNING *;`,
      info
    )
    .then((data) => data.rows)
    .catch((err) => err.message);
};

// Check each created URL on creation to make sure it has not been used before, then create URL if called!
const uniqueURLs = [];
db.query(`SELECT url FROM quizzes;`).then((data) =>
  uniqueURLs.push(...data.rows.map((url) => url.url))
);

const createURL = () => {
  const createdURL = Math.random().toString(20).substr(2, 8);
  if (!uniqueURLs.includes(createdURL)) {
    uniqueURLs.push(createdURL);
    return createdURL;
  } else {
    return createURL();
  }
};
// Adds quiz to db - accepts user_id string, and an object?
const createNewQuiz = (info) => {
  console.log("WHY")
  const createdURL = createURL();
  return db
    .query(
      `
      INSERT INTO quizzes (owner_id, title, public_listed, url)
      VALUES ($1, $2, $3, $4)
       RETURNING *;`,
      [info.owner_id, info.title, info.public_listed, createdURL || null]
    )
    .then((data) => data.rows[0])
    .catch((err) => err.message);
};

// Get answers for specific quiz
const getAnswersForQuiz = (quiz_id) => {
  return (
    (db.query = ` SELECT *
        FROM quiz_answers
        JOIN quiz_questions ON question_id = quiz_questions.id
        WHERE quiz_id = $1
        ORDER BY id;
      `),
    [quiz_id].then((data) => data.rows).catch((err) => err.message)
  );
};

// Returns all answers belonging to the given question
const getAnswersForQuestion = (question_id) => {
  return (
    (db.query = `
    SELECT *
    FROM quiz_answers
    WHERE question_id = $1
    ORDER BY id;
    `),
    [question_id].then((data) => data.rows).catch((err) => err.message)
  );
};


module.exports = {
  create,
  getAll,
  getById,
  getByUserId,
  update,
  remove,
  createQuizQuestion,
  createQuizAnswer,
  createNewQuiz,
  getAnswersForQuiz,
  getAnswersForQuestion,
  getPublicQuizzes,
  getQuestionsById,
};

/*
SELECT quiz_questions.*, quiz_answers.* as quizanswers
FROM quiz_questions
JOIN quizzes ON quizzes.id = quiz_questions.quiz_id
JOIN quiz_answers ON quiz_answers.id = quiz_questions.id
WHERE quiz_id = 1;
*/

// SELECT * FROM quiz_questions JOIN quizzes ON quizzes.id = quiz_questions.quiz_id WHERE quiz_id = $1;
