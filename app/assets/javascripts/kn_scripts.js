// wave object from waves.js:
var waves = waves || {};

// sounds obj from sounds.js:
var sounds = sounds || {};

// game obj from game.js
var game = game || {};

$(function() {
  // draw the background waves
  waves.makeWaves();
  // initialize SC client with key
  sounds.Initialize('560d601638096e37de666da699486214');

  // set game defaults:
  game.Initialize();

  $('#genre-button').click(function(e) { //wrapper for genre onclick!
    var genre = $('#genre-select').val();
    game.resetGameParams();

    // get songs from SoundCloud by Genre:
    $.ajax({
      url: '/get_songs',
      dataType: 'json',
      data: { genre: genre }
    })
    .done(function(data) {
      sounds.loadSounds({data: data}, game.drawGame);
    })
  }); //wrapper for genre onclick!

})






