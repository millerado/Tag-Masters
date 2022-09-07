// Constants

// States

// Cached Elements
const $button = $('#clickMe');
const $table = $('table');
const $rows = $('#mytable tbody tr');
const $tbody = $('tbody');
const $score = $('.score-cell');

// Event Listeners
$button.on('click', renderEvent);
$score.on('click', enterScore);

// Functions
function enterScore(event) {
  const eventId = $('#event-id')[0].innerHTML;
  const score = prompt('Please input your score');
  const playerId = event.target.parentNode.id;
  $(document).ready(() => {
    $(
      `<form action="/events/${eventId}/score?_method=PUT" method="POST"><input type="text" name="playerId" value="${playerId}"/><input type="number" name="score" value="${score}"/></form>`
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

/*
This won't work. Need to rethink how I'm sending tag data after event is processed. Consider using ajax to send a bunch of data at once

function updatePlayerTags(tags) {
  $rows.each((i, r) => {
    console.log('Prepping: ', tags[i]);
    $(document).ready(() => {
      $(
        `<form action="/players/${r.id}?_method=PUT" method="POST"><input type="number" name="currentTag" value="${tags[i]}"></input></form>`
      )
        .appendTo('body')
        .submit();
    });
    console.log('Submitted:', tags[i]);
  });
}
*/
