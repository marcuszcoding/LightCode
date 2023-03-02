const express = require('express');
const router  = express.Router();
const quizQueries = require('../db/queries/quizzes');

router.get('/', (req, res) => {
  quizQueries.getQuizzes() // recieved promise
    .then(function (quizzes) {
      console.log('quizzes', quizzes)
      const templateVars = {
        yo: quizzes
      }
      res.render('index', templateVars) // referes to ejs template variable
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

module.exports = router;

// any building block that you use to build an application = api
