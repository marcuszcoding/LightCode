const express = require("express");
const router = express.Router();
const quizzesQueries = require("../db/queries/quizzes");
// CRUD
//CREATE - POST FOR CREATE QUIZ
router.post("/", async (req, res) => {
  const { owner_id = 1, title, public_listed, url} = req.body;
  if (!owner_id || !title || !public_listed) {
    return res
      .status(400)
      .json({ message: "All properties must be provided to create a quiz" });
  }
// Need to chain database transactions, then redirect to myquizzes
  const newQuiz = { owner_id, title, public_listed, url };
  const quiz = await quizzesQueries.createNewQuiz(newQuiz)
  const questionsReqBody = req.body.questions
  for (const question of questionsReqBody) {
    const quizQuestion =  await quizzesQueries.createQuizQuestion([quiz.id, question.question])
    for (const answer of  question.answers) {
      await quizzesQueries.createQuizAnswer([quizQuestion[0].id, answer.answer, answer.isCorrect])
    }
  }

  return res.redirect("/quizzes")
});

// READ ALL = GET
router.get("/", (req, res) => {
  let query = quizzesQueries.getAll();

  const { owner_id, title, public_listed, url } = req.query;
  if ((owner_id, title, public_listed, url)) {
    query = quizzesQueries.getByuserID(owner_id);
  }

  query
    .then((quizzes) => {
      res.status(200).send({ message: "Here are you're quizzes!", quizzes });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error reading quizzes", error: err.message });
    });
});

// READ ONE - GET
router.get("/:id", (req, res) => {
  quizzesQueries
    .getById(req.params.id)
    .then((quiz) => {
      if (!quiz) {
        return res.status(400).json({ message: "  Quiz not found!" });
      }

      res.status(200).send({ message: "Here is you're quiz!", quiz });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error reading quiz", error: err.message });
    });
});

// Update - POST
router.post("/:id", (req, res) => {
  const { owner_id, title, public_listed, url } = req.body;
  if (!content) {
    return res
      .status(400)
      .json({ message: "All properties must be provided to update a quiz" });
  }

  const { id } = req.params;
  quizzesQueries
    .getById(id)
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found!" });
      }

      console.log(quiz);
      const quizBelongsToUser = quiz.owner_id === owner_id;
      if (!quizBelongsToUser) {
        return res
          .status(401)
          .json({ message: "quiz does not belongs to you!" });
      }

      return quizzesQueries.update(owner_id, title, public_listed, url);
    })
    .then((updatedquiz) => {
      res.status(201).json({ message: "quiz updated!", quiz: updatedquiz });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error updating quiz", error: err.message });
    });
});

//DELETE - DELETE
router.post("/:id/delete", (req, res) => {
  const { id } = req.params;
  quizzesQueries
    .getById(id)
    .then((quiz) => {
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found!" });
      }

      const quizBelongsToUser = quiz.owner_id === owner_id;
      if (!quizBelongsToUser) {
        return res
          .status(401)
          .json({ message: "Quiz does not belongs to you!" });
      }

      return quizzesQueries.remove(id);
    })
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error deleting quiz", error: err.message });
    });
});

// GET - Retrieves all quizzes created by the specified owner
router.get("/myquizzes/:owner_id", (req, res) => {
  const { owner_id } = req.params;
  quizzesQueries
    .getByUserId(owner_id)
    .then((quizzes) => {
      res.json(quizzes);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error retrieving quizzes", error: err.message });
    });
});

module.exports = router;
