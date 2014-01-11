var game = game || {};

game.VELOCITY = 2;

game.discovering_song = false;

game.alerted = false;

game.target_objects = {};

game.Initialize = function() {
  game.WIDTH = window.innerWidth;
  game.HEIGHT = window.innerHeight;
  // out_of_bounds = false;
  game.circ_points = game.getCircPoints();

}

// ======== Key Events! ========
game.setGameKeys = function(animations) {
  var pressed = {};

  // 'up'
  KeyboardJS.on('up',
    // key press function 
    function(e, keysPressed, keyCombo) {
      e.preventDefault();
      // prevent repeating
      if (!pressed['up']) {
        pressed['up'] = true;
        animations.moveDown.stop();
        animations.moveUp.start();      
      }
    },
    // key release function 
    function(e, keysPressed, keyCombo) { 
      if (pressed['up']) {
        pressed['up'] = false;
        animations.moveUp.stop(); 
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
        animations.moveUp.stop();
        animations.moveDown.start();      
      }
    },
    // key release function 
    function(e, keysPressed, keyCombo) { 
      if (pressed['down']) {
        pressed['down'] = false;
        animations.moveDown.stop(); 
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
        animations.moveRight.stop();
        animations.moveLeft.start();

      }
    },
    // key release function 
    function(e, keysPressed, keyCombo) { 
      if (pressed['left']) {
        pressed['left'] = false;
        animations.moveLeft.stop(); 
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
        animations.moveLeft.stop();
        animations.moveRight.start();      
      }
    },
    // key release function 
    function(e, keysPressed, keyCombo) { 
      if (pressed['right']) {
        pressed['right'] = false;
        animations.moveRight.stop(); 
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
        animations.speedUp.play();
        setTimeout( function() { animations.speedUp.reverse() }, 500);
             
      }
    },
    // key release function 
    function(e, keysPressed, keyCombo) { 
      if (pressed['space']) {
        pressed['space'] = false;
      }
  });
} // end of setGameKeys()

game.clearGameKeys = function() {
  KeyboardJS.clear('up');
  KeyboardJS.clear('down');
  KeyboardJS.clear('left');
  KeyboardJS.clear('right');
  KeyboardJS.clear('space');
}

game.getCircPoints = function() {
  var limits;

  limits = getLimits(game.HEIGHT, game.WIDTH);
  return randomLocations(limits); 

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
}

game.displaySong = function(track_data) {
  $('#discovered-song-title').html(track_data.title);
  $('#discovered-song-artist').html(track_data.artist);
  
  $('#current-song').bPopup({
    transition: "slideUp",
    easing: "easeOutQuint",
    speed: 700,
    opacity: "0",
    transitionClose: "slideDown",
    modalClose: false,
    escClose: false
  });
  
  $('#add-button').off('click');
  $('#add-button').click(function(e) {
    // console.log("add button for ", current_track_data);

    game.discoverSong(track_data);

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
    game.destroySong(track_data.id);

    game.discovering_song = false;
    $('#current-song').bPopup({
      transitionClose: "slideDown",
      opacity: "0"
    }).close();
    game.setGameKeys(game.animations);

  });
}

game.redrawGame = function() {
  // clear/reset values
  game.resetGameParams();
  game.Initialize();
  // get next 5 tracks  
  sounds.loadSounds({reload: true}, game.drawGame);

}

game.resetGameParams = function() {
  $('#game-container').html('');
  $.each(sounds.songs, function(i,song ) { song.destruct(); } );
  sounds.songs = {};
  game.target_objects = {};
  game.clearGameKeys();
  game.alerted = false;
}

game.drawGame = function(current_tracks) {
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
    game.target_objects[track.id] = circle;
    layer.add(circle);
  });

  avatar_layer.add(avatar);

  // add the layer to the stage
  stage.add(layer);
  stage.add(avatar_layer);
// =======================================================
  game.animations = new game.Animations(avatar);
  game.setGameKeys(game.animations);
} // current end of game.drawGame()


// ======== Moving Animations ========
game.Animations = function(av) {
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
      game.checkCirclePosition(av);
    } 
  }, av_layer);

  this.moveDown = new Kinetic.Animation(function(frame) {
    if (!game.out_of_bounds) {
      var currY = av.getY();
      av.setY(currY + av.getAttr('velocity'))
      game.checkCirclePosition(av);
    }
  }, av_layer);

  this.moveLeft = new Kinetic.Animation(function(frame) {

    if (!game.out_of_bounds) {
      var currX = av.getX();
      av.setX(currX - av.getAttr('velocity'))
      game.checkCirclePosition(av);
    }
  }, av_layer);

  this.moveRight = new Kinetic.Animation(function(frame) {

    if (!game.out_of_bounds) {
      var currX = av.getX();
      av.setX(currX + av.getAttr('velocity'))
      game.checkCirclePosition(av);
    }
  }, av_layer);
} // end Animations constructor
// =======================================================

game.stopAnimations = function() {
  $.each(game.animations, function(i, anim) {
    if (i != 'speedUp') {
      anim.stop();
    }
  })
}

// function for circle interactions
game.checkCirclePosition = function(avatar) {
  var layer, pos;
  
  pos = avatar.getAbsolutePosition();
  
  if (pos.x < 0 || pos.x > window.innerWidth || pos.y < 0 || pos.y > window.innerHeight ) {
    if (!game.alerted) {
      setTimeout(game.stopAnimations, 250);
      game.alerted = true;
      game.out_of_bounds = true;
      game.redrawGame();
      return
    }
  }

  for (i in game.target_objects) {
    var targObj, targSong, distance, 
        volume, opacity, radius, track_data;
    
    targObj = game.target_objects[i];
    targSong = sounds.songs[targObj.getName()]
    distance = game.getDistance(targObj, pos);

    if (!layer) {layer = targObj.getLayer();}
    
    // only modify if we are close to targObj
    if (distance != false) {
      if (distance <= 40) {
        if (!game.discovering_song) {
          track_data = targObj.getAttr('track_data');
          // var current_track_data = track_data;
          game.discovering_song = true;
          
          game.popSong(track_data.id);
          game.clearGameKeys();
          game.displaySong(track_data);
          
        }

        targSong.setVolume(100);

      } else if (distance <= 200) {
        
        volume = Math.pow((distance - 200),2) / 256; // THANKS DAD!
        opacity = (-9/1600) * distance + 49/40;
        radius = (-1/8) * distance + 35;
        targObj.setOpacity(opacity);
        targObj.setRadius(radius);
        targSong.setVolume(volume);
      } else {
        targObj.setOpacity(0.1);
        targSong.setVolume(0);
      }
    } 
  }
  if (layer) { layer.draw(); }

  waves.twitchTheWave(avatar);
  
} // end of game.checkCirclePosition()

game.popSong = function(track_id) {
  var songNode, popTween;
  
  setTimeout(game.stopAnimations, 250);

  songNode = game.target_objects[track_id];
  popTween = new Kinetic.Tween({
    node: songNode,
    duration: .5,
    opacity: 0,
    radius: 100,
    onFinish: function() {
      this.node.remove();
    }
  });
  popTween.play();
}

game.destroySong = function(track_id) {
  var songObj = sounds.songs[track_id];
  delete game.target_objects[track_id];
  songObj.destruct();
} 

game.discoverSong = function(track_data) {
  // add song to db
  // after user clicks add to playlist
  game.destroySong(track_data.id);

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

game.getDistance = function(target, pos) {
  var targ_pos = target.getAbsolutePosition();
  var distance = Math.sqrt( Math.pow((pos.x - targ_pos.x), 2) + Math.pow((pos.y - targ_pos.y), 2)  );
  
  if (distance > 225) {
    // don't render any animations if outside target distance
    return false
  } else {
    return distance;
  }
}