// FILE USED TO RENDER
const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
  res.render('home')
})

// CREATE QUIZ - GET

  router.get('/new', (req, res) => {
    res.render('create_quiz')
  })

module.exports = router;
