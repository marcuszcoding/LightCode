$(document).ready(function() {
// creates an additional question
const createQuestionElement = () => {
  return `
    <div class="single-question">
    <label for="quiz-questions">Question:</label>
    <input type="text" id="quiz-questions" name="quiz-question-1" class="quiz-question-1" required>
    <div>
      <label for="quiz-answers">Answers:</label>
      <ol>
        <li><input type="text" id="answer-1-1" name="answer-1-1" class="answer-1-1" required></li>
        <li><input type="text" id="answer-1-2" name="answer-1-2" class="answer-1-2" required></li>
        <li><input type="text" id="answer-1-3" name="answer-1-3" class="answer-1-3" required></li>
        <li><input type="text" id="answer-1-4" name="answer-1-4" class="answer-1-4" required></li>
      </ol>
    </div>
  </div>
  `
}
$(".create-quiz-form").submit(event => {
  event.preventDefault()
  console.log("lets begin")

  const questions = []
  // grabs all question elements, this allows us to dynamically loop over questions
  // and create the data required for the backend
  const questionElements = $(".single-question")
  console.log("questionElements", questionElements);

  // const old = [
  //   {
  //     question: '',
  //     answer1: ''
  //   }
  // ]

  // const questions = [
  //   {
  //     question: 'question',
  //     answers: [
  //       {
  //         answer: 'answer1',
  //         isCorrect: false
  //       },
  //       {
  //         answer: 'answer1',
  //         isCorrect: false
  //       }
  //     ]
  //   }
  // ]

  for (let i = 0; i < questionElements.length; i++) {
    // find looks for descendents of a jQuery object
    questions.push({
      question: $(questionElements[i]).find(".quiz-question-1").val(),
      answers: []
      // answer1: $(questionElements[i]).find(".answer-1-1").val(),
      // answer2: $(questionElements[i]).find(".answer-1-2").val(),
      // answer3: $(questionElements[i]).find(".answer-1-3").val(),
      // answer4: $(questionElements[i]).find(".answer-1-4").val(),
    });
    for (let j=1; j < 5; j++) {
      questions[i].answers.push({answer: $(questionElements[i]).find(`.answer-1-${j}`).val(), isCorrect: false});
    }
  }
  // formatting data so the backend can consume it
  const data = {
    title: event.target["quiz-title"].value,
    public_listed: event.target["isPublic"].value,
    questions
  }

  console.log('data', data)

  $.ajax("/api/quizzes", { method: 'POST', data})
      .then(function(response) {
        console.log(response)
      });
}),

  $(".add-question-button").click(event => {
    // appends additional question to the questions container
    $(".questions-container").append(createQuestionElement())
  })
})
