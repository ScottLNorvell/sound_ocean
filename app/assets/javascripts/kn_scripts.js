
// Globals for animation rendering:
var anims,
    out_of_bounds = false,
    discovering_song = false,
    alerted = false,
    target_objects = {}; // move to game constructor

// Globals for canvas rendering:
var circ_points, 
    scr_width, 
    scr_height, 
    avatar,
    avatar_layer, // move to game constructor
    layer, // move to game constructor
    velocity = 2;

// Globals for audio loading:
var tracks, 
    songs = {}, // stores SC.stream objects
    current_track_data = {};

// Globals for drawing waves:
var wave1, wave2, wave3;

window.onload = function() {

  scr_width = window.innerWidth;
  scr_height = window.innerHeight;
  var limits = getLimits(scr_height, scr_width);

  wave1 = new Wave();
  wave2 = new Wave();
  wave3 = new Wave();
  wave1.Initialize( 'world1', .07 );
  wave2.Initialize( 'world2', .35 );
  wave3.Initialize( 'world3', .78 );

  circ_points = randomLocations(limits);

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
      // load all the audio
      // pop last 5
      // store locally
      // feed to loadSounds      
      tracks = getFiveAndReStore(data); // pop 5 tracks and store locally
      loadSounds(tracks);
    })
  }); //wrapper for genre onclick!

}

function loadSounds(track_data, reload) {
  // play some songs in the bg
  SC.initialize({
    client_id: '560d601638096e37de666da699486214'
  });

  $.each(track_data, function(i, track) {
    var id = track.id;
    var title = track.title;

    SC.stream("/tracks/" + id, {
      volume: 0,
      id: id,
      loops: 5,
      position: 500
    }, function(sound) {
        // console.log(title);
        sound.onPosition(550, function(position) { 
          // Here is where we can monitor if songs are playing!

          console.log(id + ' reached position ' + position);
        });
        songs[id] = sound;
        sound.play()
    });

  });

  // update to take advantage of onPosition callback!
  SC.whenStreamingReady(function() {
    if (!reload) {
      drawGame(); 
    } else {
      setTimeout( function() { 
        out_of_bounds = false;
        drawGame();
      }, 1000)
    }
    
  });
}

function redrawGame() {
  // clear/reset values
  resetGameParams();

  // re-check window dimensions
  scr_width = window.innerWidth;
  scr_height = window.innerHeight;

  // get new random points
  var limits = getLimits(scr_height, scr_width);
  circ_points = randomLocations(limits);

  // get next 5 tracks
  data = JSON.parse(localStorage.getItem('tracks'));
  // var ln = data.length;
  tracks = getFiveAndReStore(data);
  
  // localStorage.setItem('tracks', JSON.stringify(data));
  loadSounds(tracks, true);

}

function resetGameParams() {
  $('#game-container').html('');
  $.each(songs, function(i,song ) { song.destruct(); } );
  songs = {};
  target_objects = {};
  clearGameKeys();
  alerted = false;
}



function getFiveAndReStore(data) {
  var ln = data.length;
  var popped_data = data.splice(ln - 5, ln);
  localStorage.setItem('tracks', JSON.stringify(data));
  return popped_data 
}

function drawGame() {
  
// =======================================================
// ========== move to Game constructer ===================
// =======================================================

  // make stage
  var stage = new Kinetic.Stage({
    container: 'game-container',
    width: scr_width,
    height: scr_height
  });

  avatar_layer = new Kinetic.Layer();

  // make layer
  layer = new Kinetic.Layer();

  // make avatar
  avatar = new Kinetic.Circle({
    x: scr_width / 2,
    y: scr_height / 2,
    radius: 20,
    fillRadialGradientStartPoint: 0,
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndPoint: 0,
    fillRadialGradientEndRadius: 15,
    fillRadialGradientColorStops: [0.5, '#90FEFB', 1, '#54FF9F'],
    velocity: velocity
  });

  // console.log("track_data = ", tracks)

  $.each(tracks, function(i, track) {
    var pt = circ_points[i];
    var circle = new Kinetic.Circle({
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
  anims = new Animations(avatar, avatar_layer);
  setGameKeys();
} // current end of drawGame()


// ======== Key Events! ========
function setGameKeys() {
  var pressed = {};

  // 'up'
  KeyboardJS.on('up',
    // key press function 
    function(e, keysPressed, keyCombo) {
      e.preventDefault();
      // prevent repeating
      if (!pressed['up']) {
        pressed['up'] = true;
        anims.moveDown.stop();
        anims.moveUp.start();      
      }
    },
    // key release function 
    function(e, keysPressed, keyCombo) { 
      if (pressed['up']) {
        pressed['up'] = false;
        anims.moveUp.stop(); 
      }
  });

  // 'down'
  KeyboardJS.on('down',
    // key press function 
    function(e, keysPressed, keyCombo) {
      e.preventDefault();
      // prevent repeating
      if (!pressed['down']) {
        pressed['down'] = true;
        anims.moveUp.stop();
        anims.moveDown.start();      
      }
    },
    // key release function 
    function(e, keysPressed, keyCombo) { 
      if (pressed['down']) {
        pressed['down'] = false;
        anims.moveDown.stop(); 
      }
  });

  // 'left'
  KeyboardJS.on('left',
    // key press function 
    function(e, keysPressed, keyCombo) {
      e.preventDefault();
      // prevent repeating
      if (!pressed['left']) {
        pressed['left'] = true;
        anims.moveRight.stop();
        anims.moveLeft.start();

      }
    },
    // key release function 
    function(e, keysPressed, keyCombo) { 
      if (pressed['left']) {
        pressed['left'] = false;
        anims.moveLeft.stop(); 
      }
  });

  // 'right'
  KeyboardJS.on('right',
    // key press function 
    function(e, keysPressed, keyCombo) {
      e.preventDefault();
      // prevent repeating
      if (!pressed['right']) {
        pressed['right'] = true;
        anims.moveLeft.stop();
        anims.moveRight.start();      
      }
    },
    // key release function 
    function(e, keysPressed, keyCombo) { 
      if (pressed['right']) {
        pressed['right'] = false;
        anims.moveRight.stop(); 
      }
  });

  // 'space'
  KeyboardJS.on('space',
    // key press function 
    function(e, keysPressed, keyCombo) {
      e.preventDefault();
      // prevent repeating
      if (!pressed['space']) {
        pressed['space'] = true;
        anims.speedUp.play();
        setTimeout( function() { anims.speedUp.reverse() }, 500);
             
      }
    },
    // key release function 
    function(e, keysPressed, keyCombo) { 
      if (pressed['space']) {
        pressed['space'] = false;
      }
  });
} // end of setGameKeys()

function clearGameKeys() {
  KeyboardJS.clear('up');
  KeyboardJS.clear('down');
  KeyboardJS.clear('left');
  KeyboardJS.clear('right');
  KeyboardJS.clear('space');
}

// ======== Moving Animations ========
function Animations(av, av_layer) {
  // speed up tween
  this.speedUp = new Kinetic.Tween({
    node: av,
    velocity: 4,
    duration: .5,
    easing: Kinetic.Easings.StrongEaseOut
  });

  this.moveUp = new Kinetic.Animation(function(frame) {
    if (!out_of_bounds) {
      var currY = av.getY();
      av.setY(currY - av.getAttr('velocity'))
      checkCirclePosition();
    } 
  }, av_layer);

  this.moveDown = new Kinetic.Animation(function(frame) {
    if (!out_of_bounds) {
      var currY = av.getY();
      av.setY(currY + av.getAttr('velocity'))
      checkCirclePosition();
    }
  }, av_layer);

  this.moveLeft = new Kinetic.Animation(function(frame) {

    if (!out_of_bounds) {
      var currX = av.getX();
      av.setX(currX - av.getAttr('velocity'))
      checkCirclePosition();
    }
  }, av_layer);

  this.moveRight = new Kinetic.Animation(function(frame) {

    if (!out_of_bounds) {
      var currX = av.getX();
      av.setX(currX + av.getAttr('velocity'))
      checkCirclePosition();
    }
  }, av_layer);
} // end Animations constructor
// =======================================================


// function for circle interactions
function checkCirclePosition() {
  var distance, volume;
  var pos = avatar.getAbsolutePosition();
  
  if (pos.x < 0 || pos.x > window.innerWidth || pos.y < 0 || pos.y > window.innerHeight ) {
    if (!alerted) {
      
      alerted = true;
      out_of_bounds = true;
      redrawGame();
      return
    }
  }

  for (i in target_objects) {
    var targObj = target_objects[i];
    var targSong = songs[targObj.getName()]
    distance = getDistanceFrom(targObj);

    // only modify if we are close to targObj
    if (distance != false) {
      if (distance <= 40) {
        if (!discovering_song) {
          var track_data = targObj.getAttr('track_data');
          current_track_data = track_data;
          discovering_song = true;

          $('#discovered-song-title').html(track_data.title);
          $('#discovered-song-artist').html(track_data.artist);
          
          popSong(track_data.id);
          clearGameKeys();

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

          $('#add-button').click(function(e) {
            // console.log("add button for ", current_track_data);

            discoverSong(current_track_data);

            discovering_song = false
            $('#current-song').bPopup({
              transitionClose: "slideDown",
              opacity: "0"
            }).close();
            setGameKeys();
          });
          
          $('#no-thanks').click(function(e) {

            // console.log("no-thanks button for ", current_track_data);
            destroySong(current_track_data.id);

            discovering_song = false;
            $('#current-song').bPopup({
              transitionClose: "slideDown",
              opacity: "0"
            }).close();
            setGameKeys();

          });

          // add to playlist
          // discoverSong(track_data)
          
        }

        targSong.setVolume(100);

      } else if (distance <= 200) {
        // var volume_linear = -5/8 * distance + 125;
        // discovering_song = false;
        var volume = Math.pow((distance - 200),2) / 256; // THANKS DAD!
        // volume = volume_parabolic;
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
  twitchTheWave();
  
}

function twitchTheWave() {
  // console.log('twitching')
  var pos = avatar.getAbsolutePosition();
  var wave1_y = scr_height * .07
  var wave2_y = scr_height * .35
  var wave3_y = scr_height * .78
  if (pos.y >= wave1_y - 2 && pos.y <= wave1_y + 2 ) {
    wave1.makeImpulse(pos.x, 1)
  } else if (pos.y >= wave2_y - 2 && pos.y <= wave2_y + 2 ) {
    wave2.makeImpulse(pos.x, 1)
  } else if (pos.y >= wave3_y - 2 && pos.y <= wave3_y + 2 ) {
    wave3.makeImpulse(pos.x, 1)
  }
}

function popSong (track_id) {
  var songNode = target_objects[track_id];
  var popSong = new Kinetic.Tween({
    node: songNode,
    duration: .5,
    opacity: 0,
    radius: 100,
    onFinish: function() {
      this.node.remove();
      layer.draw();
    }
  });
  popSong.play();
}

function destroySong (track_id) {
  var songObj = songs[track_id];
  var targObj = target_objects[track_id];
  // delete songs[track_id]
  // targObj.remove();

  delete target_objects[track_id];
  songObj.destruct();
  layer.draw();

} 

function discoverSong (track_data) {
  // add song to db

  // after user clicks add to playlist
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
    var track_id = song_data.sc_track_id;
    var songObj = songs[track_id];
    var targObj = target_objects[track_id];

    $('#current-user-score').html(data.user_score);
    var songli = $('<li>');
    var songlink = $('<a>').attr({
      href: song_data.url,
      target: '_blank'
    }).html(song_data.artist + ' - ' + song_data.title);
    songli.append(songlink);
    $('#playlist-ul').prepend(songli);

  })
  .always(function() {
    discovering_song = false;
    destroySong(current_track_data.id);

  })
  

  // console.log(track_data);
}

function getDistanceFrom(target) {
  var pos = avatar.getAbsolutePosition();
  var targ_pos = target.getAbsolutePosition();
  var distance = Math.sqrt( Math.pow((pos.x - targ_pos.x), 2) + Math.pow((pos.y - targ_pos.y), 2)  );
  
  if (distance > 225) {
    // don't render any animations if outside target distance
    return false

  } else {
    return distance;
  }
}

function randomPt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomLocations(limits) {
  var circ_points = [];
  // throw one out, possibly save to as avatar position?
  limits.splice(randomPt(0, limits.length - 1), 1);
  $.each(limits, function(i) {
    var limit = limits[i];
    var circ_point = {};
    circ_point.x = randomPt(limit.xMin,limit.xMax);
    circ_point.y = randomPt(limit.yMin,limit.yMax);
    circ_points.push(circ_point);
  });
  return circ_points
}

function getLimits(height, width) {
  var b = 75, //buffer
      x1 = Math.floor(width/3),
      x2 = Math.floor(width - width/3),
      y1 = Math.floor(height/2);
  // I can possibly make this more programmatic?
  return [{ //a
      xMin: b,
      xMax: x1 - b,
      yMin: b,
      yMax: y1 - b
    },
    { //b
      xMin: x1 + b,
      xMax: x2 - b,
      yMin: b,
      yMax: y1 - b
    },
    { //c
      xMin: x2 + b,
      xMax: width - b,
      yMin: b,
      yMax: y1 - b
    },
    { //d
      xMin: b,
      xMax: x1 - b,
      yMin: y1 + b,
      yMax: height - b
    },
    { //e
      xMin: x1 + b,
      xMax: x2 - b,
      yMin: y1 + b,
      yMax: height - b
    },
    { //f
      xMin: x2 + b,
      xMax: width - b,
      yMin: y1 + b,
      yMax: height - b
    }
  ]
}


