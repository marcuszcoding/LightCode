// FILE USED TO RENDER
const express = require("express");
const axios = require("axios");
const router = express.Router();

const instance = axios.create({
  baseURL: "http://127.0.0.1:8080",
});

// HOME - GET, Renders Home Page (/quizzes)
router.get("/", (req, res) => {
  instance
    .get("/api/quizzes")
    .then((response) => {
      const templateData = { quizzes: response.data.quizzes };
      console.log(templateData);
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

// MY QUIZZES - GET, Renders My Quizzes Page

router.get("/myquizzes/:owner_id", (req, res) => {
  const { owner_id } = req.params;
  instance
    .get(`/api/quizzes?owner_id=${owner_id}`)
    .then((response) => {
      const templateData = { quizzes: response.data.quizzes };
      res.render("my_quizzes", templateData);
    })
    .catch((err) => {
      console.log("Failure", err);
      res.render("my_quizzes");
    });
});

// QUIZ - GET, Renders Quiz Attempt

router.get("/quiztake", (req, res) => {
  res.render("quiz_take");
});

// QUIZ - GET, Renders Quiz Score

router.get("/quizscore", (req, res) => {
  res.render("quiz_score");
});

module.exports = router;
