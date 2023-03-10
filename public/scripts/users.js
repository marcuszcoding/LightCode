// Client facing scripts here
$(() => {
  $('#fetch-users').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/users'
    })
    .done((response) => {
      const $usersList = $('#users');
      $usersList.empty();

      for(const user of response.users) {
        $(`<li class="user">`).text(user.name).appendTo($usersList);
      }
    });
  });
});

$(document).on('click', '.share-quiz', function() {
  const quizId = $(this).attr('data-id');
  const baseUrl = window.location.origin;
  const shareUrl = baseUrl + '/quizzes/' + quizId;

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

// Retake Button
$(document).on('click', '.retake', function() {
  const quizId = $(this).attr('data-id');
  const retakeUrl = '/quizzes/' + quizId;
  window.location.href = retakeUrl;
});
