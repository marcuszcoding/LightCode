/*$(document).ready(function() {
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
*/
$(document).on('click', '.share-quiz', function() {
  const id = $(this).attr('data-id');
  const baseUrl = window.location.origin;
  const shareUrl = baseUrl + '/quizzes/' + id;

  // Only create the popup box once
  let shareBox = $('.share-box');
  if (!shareBox.length) {
    shareBox = $('<div class="share-box"></div>');
    $('body').append(shareBox);
  }

  const shareInput = $('<input class="share-input" readonly>');
  shareInput.val(shareUrl);

  const shareButton = $('<button class="share-button">Copy Link</button>');
  shareButton.click(function() {
    shareInput.select();
    document.execCommand('copy');
    shareButton.text('Copied!');
  });

  shareBox.empty().append(shareInput, shareButton);
  shareBox.show();
});

$(document).mouseup(function(e) {
  const container = $('.share-box');
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.hide();
  }
});







