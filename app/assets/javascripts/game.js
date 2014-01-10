var game = game || {};

game.VELOCITY = 2;

game.discovering_song = false;

game.alerted = false;

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