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
