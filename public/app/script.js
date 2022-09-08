// Constants

// States

// Cached Elements
const $button = $('#clickMe');
const $table = $('table');
const $rows = $('#mytable tbody tr');
const $tbody = $('tbody');
const $score = $('.score-cell');
const eventId = $('#event-id')[0].innerHTML;

// Event Listeners
$button.on('click', renderEvent);
$score.on('click', enterScore);

// Functions
function enterScore(event) {
  const score = prompt('Please input your score');
  const playerId = event.target.parentNode.id;
  $(document).ready(() => {
    $(
      `<form class="hidden" action="/events/${eventId}/score?_method=PUT" method="POST"><input type="text" name="playerId" value="${playerId}"/><input type="number" name="score" value="${score}"/></form>`
    )
      .appendTo('body')
      .submit();
  });
}

function displayNewTags(tags) {
  $('.new-tag').each((i, e) => {
    e.innerHTML = tags[i];
  });
}

function sortTags(tags) {
  tags.sort((a, b) => {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  });
  return tags;
}

function getAllCurrentTags() {
  const tagArray = [];
  $('.current-tag').each((i, e) => {
    tagArray.push(parseInt(e.innerHTML, 10));
  });
  return tagArray;
}

function updatePlayerTags(tags) {
  const ids = [];
  $('.player-id').each((i, row) => {
    ids.push(row.id);
  });
  $(document).ready(() => {
    $(
      `<form class="hidden" action="/players/update?_method=PUT" method="POST"><input type="text" name="ids" value="${ids}"></input><input type="text" name="tags" value="${tags}"></input><input type="text" name="eventId" value="${eventId}"></input></form>`
    )
      .appendTo('body')
      .submit();
  });
}

function sortTable() {
  $rows.sort((a, b) => {
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

function renderEvent() {
  sortTable();
  const tags = sortTags(getAllCurrentTags());
  displayNewTags(tags);
  updatePlayerTags(tags);
}
