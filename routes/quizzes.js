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

// QUIZ - GET, RENDERS QUIZ PAGE

  router.get('/quiz', (req, res) => {
    res.render('quiz')
  });

module.exports = router;
