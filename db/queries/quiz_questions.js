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
