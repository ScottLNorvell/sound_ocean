var sounds = sounds || {}

sounds.Initialize = function(sc_client_id) {
  SC.initialize({
    client_id: sc_client_id
  });
} 

sounds.loadSounds = function(opts, callback) {
  opts = opts || {}

  sounds.current_tracks = sounds.getTracks(opts.data);

  $.each(sounds.current_tracks, function(i, track) {
    var id = track.id;
    var title = track.title;

    SC.stream("/tracks/" + id, {
      volume: 0,
      id: id,
      loops: 5,
      position: 500
    }, function(sound) {
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
    if (!opts.reload) {
      callback(sounds.current_tracks); 
    } else {
      setTimeout( function() { 
        out_of_bounds = false;
        callback(sounds.current_tracks);
      }, 1000)
    }
    
  });
}

sounds.getTracks = function(data) {
  var ln, popped_data;
  if (!data) {
    data = JSON.parse(localStorage.getItem('tracks'));
  } 
  ln = data.length;
  popped_data = data.splice(ln - 5, ln);
  localStorage.setItem('tracks', JSON.stringify(data));
  return popped_data 
}