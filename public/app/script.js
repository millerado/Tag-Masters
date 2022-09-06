// Constants

// States

// Cached Elements
const $button = $('#clickMe');
const $table = $('table');
const $rows = $('#mytable tbody tr');
const $tbody = $('tbody');

// Event Listeners
$button.on('click', sortTable);

// Functions
function sortTable() {
  $rows.sort(function (a, b) {
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
