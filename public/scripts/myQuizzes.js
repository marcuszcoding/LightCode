$(document).ready(function() {
  // Load quizzes when page is ready
  const owner_id = "<%= owner_id %>";
  loadQuizzes(owner_id);
});

function loadQuizzes(owner_id) {
  // Send GET request to fetch all quizzes for the specified owner
  $.get("/api/quizzes/myquizzes/${owner_id}", function(data) {
    // Loop through quizzes and append them to the list
    for (let i = 0; i < data.length; i++) {
      let quiz = data[i];

      let quizItem = `<li><a href='/quizzes/myquizzes/${owner_id}'>${quiz.title}</a></li>`;
      $("#quiz-list").append(quizItem);
    }
  });
}






