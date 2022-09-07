// Constants

// States

// Cached Elements
const $button = $('#clickMe');
const $table = $('table');
const $rows = $('#mytable tbody tr');
const $tbody = $('tbody');
const $score = $('.score-cell');

// Event Listeners
$button.on('click', getAllCurrentTags);
$score.on('click', enterScore);

// Functions
function getAllCurrentTags() {
  const tagArray = [];
  $('.current-tag').each((i, e) => {
    tagArray.push(parseInt(e.innerHTML, 10));
  });
  return tagArray;
}

function enterScore(event) {
  const score = prompt('Please enter score');
  event.target.innerHTML = score;
}

function sortTable() {
  $rows.sort(function (a, b) {
    let A = parseInt($(a).children('td').eq(3).text(), 10);
    let B = parseInt($(b).children('td').eq(3).text(), 10);
    if (A < B) {
      return -1;
    }
    if (A > B) {
      return 1;
    }
    return 0;
  });
  $.each($rows, function (index, row) {
    $('#mytable').children('tbody').append(row);
  });
}
