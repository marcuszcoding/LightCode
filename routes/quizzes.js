// FILE USED TO RENDER
const express = require("express");
const router = express.Router();

// HOME - GET, Renders Home Page (/quizzes)
  router.get('/', (req, res) => {
    res.render('home')
  });

// CREATE QUIZ - GET, Renders Create Quiz Page

  router.get('/new', (req, res) => {
    res.render('create_quiz')
  });

// MY QUIZZES - GET, Renders My Quizzes Page

  router.get('/myquizzes', (req, res) => {
    res.render('my_quizzes')
  });

// QUIZ - GET, Renders Quiz Attempt

  router.get('/quiztake', (req, res) => {
  res.render('quiz_take')
  });

// QUIZ - GET, Renders Quiz Score

  router.get('/quizscore', (req, res) => {
    res.render('quiz_score')
  });

module.exports = router;
