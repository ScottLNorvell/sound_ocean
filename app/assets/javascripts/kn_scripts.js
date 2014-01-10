// wave object from waves.js:
var waves = waves || {};

// sounds obj from sounds.js:
var sounds = sounds || {};

// game obj from game.js
var game = game || {};

// var vis = vis || {};

// Globals for animation rendering:
var target_objects = {}; // move to game constructor

// Globals for audio loading:
var songs = {} // stores SC.stream objects

$(function() {
  // draw the background waves
  waves.makeWaves();
  // initialize SC client with key
  sounds.Initialize('560d601638096e37de666da699486214');

  // set game defaults:
  game.Initialize();

  $('#genre-button').click(function(e) { //wrapper for genre onclick!
    var genre = $('#genre-select').val();
    resetGameParams();

    // get songs from SoundCloud by Genre:
    $.ajax({
      url: '/get_songs',
      dataType: 'json',
      data: { genre: genre }
    })
    .done(function(data) {
      sounds.loadSounds({data: data}, drawGame);
    })
  }); //wrapper for genre onclick!

})

function redrawGame() {
  // clear/reset values
  resetGameParams();

  game.Initialize();

  // get next 5 tracks  
  sounds.loadSounds({reload: true}, drawGame);

}

function resetGameParams() {
  $('#game-container').html('');
  $.each(songs, function(i,song ) { song.destruct(); } );
  songs = {};
  target_objects = {};
  game.clearGameKeys();
  game.alerted = false;
}

function drawGame(current_tracks) {
  var stage, layer, avatar, avatar_layer;  

  // make stage
  stage = new Kinetic.Stage({
    container: 'game-container',
    width: game.WIDTH,
    height: game.HEIGHT
  });

  avatar_layer = new Kinetic.Layer();

  // make layer
  layer = new Kinetic.Layer();

  // make avatar
  avatar = new Kinetic.Circle({
    x: game.WIDTH / 2,
    y: game.HEIGHT / 2,
    radius: 20,
    fillRadialGradientStartPoint: 0,
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndPoint: 0,
    fillRadialGradientEndRadius: 15,
    fillRadialGradientColorStops: [0.5, '#90FEFB', 1, '#54FF9F'],
    velocity: game.VELOCITY
  });

  // console.log("track_data = ", tracks)

  $.each(game.circ_points, function(i, pt) {
    var circle,track;
    track = current_tracks[i];
    circle = new Kinetic.Circle({
      x: pt.x,
      y: pt.y,
      radius: 10,
      fillLinearGradientStartPoint: [-10, -10],
      fillLinearGradientEndPoint: [15, 15],
      fillLinearGradientColorStops: [0, 'pink', 1, 'purple'],
      opacity: 0.1,
      // strokeWidth: 4,
      name: track.id,
      track_data: track
    });
    target_objects[track.id] = circle;
    layer.add(circle);
  });

  avatar_layer.add(avatar);

  // add the layer to the stage
  stage.add(layer);
  stage.add(avatar_layer);
// =======================================================
  game.animations = new Animations(avatar);
  game.setGameKeys(game.animations);
} // current end of drawGame()


// ======== Moving Animations ========
function Animations(av) {
  // speed up tween
  var av_layer = av.getLayer();

  game.out_of_bounds = false;

  this.speedUp = new Kinetic.Tween({
    node: av,
    velocity: 4,
    duration: .5,
    easing: Kinetic.Easings.StrongEaseOut
  });

  this.moveUp = new Kinetic.Animation(function(frame) {
    if (!game.out_of_bounds) {
      var currY = av.getY();
      av.setY(currY - av.getAttr('velocity'))
      checkCirclePosition(av);
    } 
  }, av_layer);

  this.moveDown = new Kinetic.Animation(function(frame) {
    if (!game.out_of_bounds) {
      var currY = av.getY();
      av.setY(currY + av.getAttr('velocity'))
      checkCirclePosition(av);
    }
  }, av_layer);

  this.moveLeft = new Kinetic.Animation(function(frame) {

    if (!game.out_of_bounds) {
      var currX = av.getX();
      av.setX(currX - av.getAttr('velocity'))
      checkCirclePosition(av);
    }
  }, av_layer);

  this.moveRight = new Kinetic.Animation(function(frame) {

    if (!game.out_of_bounds) {
      var currX = av.getX();
      av.setX(currX + av.getAttr('velocity'))
      checkCirclePosition(av);
    }
  }, av_layer);
} // end Animations constructor
// =======================================================


// function for circle interactions
function checkCirclePosition(avatar) {
  var distance, volume;
  var pos = avatar.getAbsolutePosition();
  
  if (pos.x < 0 || pos.x > window.innerWidth || pos.y < 0 || pos.y > window.innerHeight ) {
    if (!game.alerted) {
      
      game.alerted = true;
      game.out_of_bounds = true;
      redrawGame();
      return
    }
  }

  for (i in target_objects) {
    var targObj = target_objects[i];
    var layer = targObj.getLayer();
    var targSong = songs[targObj.getName()]
    distance = getDistanceFrom(targObj, pos);

    // only modify if we are close to targObj
    if (distance != false) {
      if (distance <= 40) {
        if (!game.discovering_song) {
          var track_data = targObj.getAttr('track_data');
          // var current_track_data = track_data;
          game.discovering_song = true;

          $('#discovered-song-title').html(track_data.title);
          $('#discovered-song-artist').html(track_data.artist);
          
          popSong(track_data.id);
          game.clearGameKeys();

          $('#current-song').bPopup({
            transition: "slideUp",
            easing: "easeOutQuint",
            speed: 700,
            opacity: "0",
            transitionClose: "slideDown",
            modalClose: false,
            escClose: false
            // zindex: 99999
          });
          
          $('#add-button').off('click');
          $('#add-button').click(function(e) {
            // console.log("add button for ", current_track_data);

            discoverSong(track_data);

            game.discovering_song = false
            $('#current-song').bPopup({
              transitionClose: "slideDown",
              opacity: "0"
            }).close();
            game.setGameKeys(game.animations);
          });
          
          $('#no-thanks').off('click');
          $('#no-thanks').click(function(e) {

            // console.log("no-thanks button for ", current_track_data);
            destroySong(track_data.id);

            game.discovering_song = false;
            $('#current-song').bPopup({
              transitionClose: "slideDown",
              opacity: "0"
            }).close();
            game.setGameKeys(game.animations);

          });
          
        }

        targSong.setVolume(100);

      } else if (distance <= 200) {
        
        var volume = Math.pow((distance - 200),2) / 256; // THANKS DAD!
        var opacity = (-9/1600) * distance + 49/40;
        var radius = (-1/8) * distance + 35;
        targObj.setOpacity(opacity);
        targObj.setRadius(radius);
        targSong.setVolume(volume);
      } else {
        targObj.setOpacity(0.1);
        targSong.setVolume(0);
      }
    } 
  }
  layer.draw();
  waves.twitchTheWave(avatar);
  
} // end of checkCirclePosition()

function popSong (track_id) {
  var songNode = target_objects[track_id];
  var popSong = new Kinetic.Tween({
    node: songNode,
    duration: .5,
    opacity: 0,
    radius: 100,
    onFinish: function() {
      this.node.remove();
      
    }
  });
  popSong.play();
}

function destroySong (track_id) {
  var songObj = songs[track_id];
  var targObj = target_objects[track_id];

  delete target_objects[track_id];
  songObj.destruct();
  

} 

function discoverSong (track_data) {
  // add song to db
  // after user clicks add to playlist
  destroySong(track_data.id);

  var params = {
    song: {
      sc_track_id: track_data.id,
      title: track_data.title,
      genre: track_data.genre,
      artist: track_data.artist,
      url: track_data.url
    }
  }
  $.ajax({
    url: '/discover/' + track_data.id,    
    type: 'POST',
    dataType: 'JSON',
    data: params,
  })
  .done(function(data) {
    // update user score, etc...
    var song_data = data.song;

    $('#current-user-score').html(data.user_score);
    var songli = $('<li>');
    var songlink = $('<a>').attr({
      href: song_data.url,
      target: '_blank'
    }).html(song_data.artist + ' - ' + song_data.title);

    songli.append(songlink);

    $('#playlist-ul').prepend(songli);
    $('#no-songs').remove();

  })
  .always(function() {
    game.discovering_song = false;
  })
  
}

function getDistanceFrom(target, pos) {
  var targ_pos = target.getAbsolutePosition();
  var distance = Math.sqrt( Math.pow((pos.x - targ_pos.x), 2) + Math.pow((pos.y - targ_pos.y), 2)  );
  
  if (distance > 225) {
    // don't render any animations if outside target distance
    return false
  } else {
    return distance;
  }
}




