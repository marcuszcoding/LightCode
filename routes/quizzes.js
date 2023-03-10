// FILE USED TO RENDER
const express = require("express");
const axios = require("axios");
const router = express.Router();
const quizzesQueries = require("../db/queries/quizzes");
const { route } = require("./quizzes-api");

// HOME - GET, Renders Home Page (/quizzes)
router.get("/", (req, res) => {
  quizzesQueries
    .getAll()
    .then((quizzes) => {
      const publicQuizzes = quizzes.filter(q => q.public_listed)
      const templateData = { quizzes: publicQuizzes };
      res.render("home", templateData);
    })
    .catch((err) => {
      console.log("Failure", err);
      res.render("home");
    });
});

// CREATE QUIZ - GET, Renders Create Quiz Page

router.get("/new", (req, res) => {
  res.render("create_quiz");
});

// QUIZ - GET, Renders Quiz Attempt

// router.get("/:id", (req, res) => {
//   quizzesQueries
//     .getById(req.params.id)
//     .then((quiz) => {
//       const templateData = { quiz };
//       console.log(templateData);
//       res.render("quiz_take", templateData);
//     })
//     .catch((err) => {
//       console.log("Failure", err);
//       res.render("home");
//     });
// });

router.get("/myquizzes", (req, res) => {
  const userId = 1;
  quizzesQueries
    .getByUserId(userId)
    .then((quizzes) => {
      const templateData = { quizzes };
      res.render("my_quizzes", templateData);
    })
    .catch((err) => {
      console.log("Failure", err);
      res.render("home", { quizzes: [] });
    });
});

router.get("/:id", (req, res) => {
  quizzesQueries
    .getQuestionsById(req.params.id)
    .then((quizzes) => {
      const templateData = { quizzes };
      console.log(templateData);
      res.render("quiz_take", templateData);
    })
    .catch((err) => {
      console.log("Failure", err);
      res.render("home", { quizzes: [] });
    });
});

router.post("/submit_answers/:id", async (req, res) => {
  const questionsId = Object.keys(req.body.answer).map(
    (key) => key.split("question")[1]
  );
  const isCorrect = [];
  for (const questionId of questionsId) {
    const answerId = `${await quizzesQueries.getCorrectAnswer(questionId)}`;
    isCorrect.push({
      correctAnswer: answerId,
      studentAnswer: req.body.answer["question" + questionId],
      score: answerId === req.body.answer["question" + questionId] ? 1 : 0,
    });
  }
  const score = isCorrect.reduce(
    (total, question) => total + question.score,
    0
  );
  console.log(score);
  console.log(isCorrect);
  console.log(questionsId);
  console.log("body", req.body);
  console.log("quiz", req.params.id);
  res.redirect(
    `/quizzes/quizresult/1?score=${score}&totalQuestions=${isCorrect.length}`
  );
});
//insert the response into the db
//calculate score then insert into quiz results (user, quiz, score)

// QUIZ - GET, Renders Quiz Score

router.get("/quizresult/:id", (req, res) => {
  res.render("quiz_score", {
    score: req.query.score,
    total: req.query.totalQuestions,
    quizId: req.params.id,
  });
});

module.exports = router;

