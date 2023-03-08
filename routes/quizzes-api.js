const express = require("express");
const router = express.Router();
const quizzesQueries = require("../db/queries/quizzes");
// CRUD
//CREATE - POST FOR CREATE QUIZ
router.post("/", (req, res) => {
  console.log("req.body", req.body)
  const { owner_id = 1, title, public_listed, url} = req.body;
  console.log(req.body)
  if (!owner_id || !title || !public_listed) {
    return res
      .status(400)
      .json({ message: "All properties must be provided to create a quiz" });
  }
// Need to chain database transactions, then redirect to myquizzes
const newQuiz = { owner_id, title, public_listed, url };
quizzesQueries
  .createNewQuiz(newQuiz)
  .then((quiz) => {
    console.log("hello", quiz)
    // res.status(201).send({ message: "quiz created", quiz });
    req.body.questions.forEach(question => {
      quizzesQueries.createQuizQuestion([quiz.id, question.question])
      .then((quizQuestion) => {
        console.log(quizQuestion)
        question.answers.forEach(answer => {
          quizzesQueries.createQuizAnswer([quizQuestion[0].id, answer.answer, answer.isCorrect]);
          // res.status(201).send({ message: "quiz created", quiz });
        })
      })
    });

    return quiz
  })
    // .then((quiz) => {
    //   const newQuestion = { quiz_id: quiz.id, question: req.body}
    //   console.log("2nd Hello", quiz, req.body)
    //   quizzesQueries.createQuizQuestion()
    //   // res.status(201).send({ message: "quiz questions created", quiz });
    //   return quiz
    // })
    // .then((quiz) => {
    //   console.log("3rd Hello", quiz)
    //   quizzesQueries.createQuizAnswer()
    //   res.status(201).send({ message: "quiz created", quiz });
    // })
    // .catch((err) => {
    //   res
    //     .status(500)
    //     console.log("4th Hello", quiz)
    //     .json({ message: "Error creating quiz", error: err.message });
    // });
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

module.exports = router;
