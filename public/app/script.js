// Constants

// States

// Cached Elements
const $button = $('#clickMe');
const $table = $('table');
const $rows = $('#mytable tbody tr');
const $tbody = $('tbody');
const $score = $('.score-cell');

// Event Listeners
$button.on('click', sortTable);
$score.on('click', enterScore);

// Functions
function enterScore(event) {
  const score = prompt('Please enter score');
  console.log(event.target);
  event.target.innerHTML = score;
}

function sortTable() {
  $rows.sort(function (a, b) {
    console.log($(a).children('td').eq(3)[0]);
    var A = parseInt($(a).children('td').eq(1).text(), 10);
    var B = parseInt($(b).children('td').eq(1).text(), 10);
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
