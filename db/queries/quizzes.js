const db = require('../connection');

const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes;') // returning a promise
    .then(data => {
      return data.rows;
    });
};

module.exports = { getQuizzes };
