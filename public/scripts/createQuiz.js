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
        <li><input type="text" id="answer-1-1" name="answer-1-1" class="answer-1-1" required>
              <input type="checkbox" id="answer-1-1-correct" name="answer-1-1-correct" class="answer-1-1-correct">
            </li>
            <li><input type="text" id="answer-1-2" name="answer-1-2" class="answer-1-2" required>
              <input type="checkbox" id="answer-1-2-correct" name="answer-1-2-correct" class="answer-1-2-correct">
            </li>
            <li><input type="text" id="answer-1-3" name="answer-1-3" class="answer-1-3" required>
              <input type="checkbox" id="answer-1-3-correct" name="answer-1-3-correct" class="answer-1-3-correct">
            </li>
            <li><input type="text" id="answer-1-4" name="answer-1-4" class="answer-1-4" required>
              <input type="checkbox" id="answer-1-4-correct" name="answer-1-4-correct" class="answer-1-4-correct">
            </li>
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
      questions[i].answers.push({
        answer: $(questionElements[i]).find(`.answer-1-${j}`).val(),
        isCorrect: $(questionElements[i]).find(`.answer-1-${j}-correct:checked`).val() === "on"
      });
    }
  }

  console.log('questions', questions)
  // formatting data so the backend can consume it
  const data = {
    title: event.target["quiz-title"].value,
    public_listed: event.target["privacy"].value,
    questions
  }

  console.log('data', data)

  $.ajax("/api/quizzes", { method: 'POST', data}).then(() => {
    window.location.replace("http://localhost:8080/quizzes")
  })
}),

  $(".add-question-button").click(event => {
    // appends additional question to the questions container
    $(".questions-container").append(createQuestionElement())
  })
})
