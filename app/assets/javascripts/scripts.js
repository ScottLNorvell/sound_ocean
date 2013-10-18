$(document).ready(function() {


  $('#playlist-menu').hover(function() {
    animateMenuIn();
  }, function() {
    animateMenuOut();
  });

  $('#ranking').hover(function() {
    animateRankingIn();
  }, function() {
    animateRankingOut();
  });


  $('#genre-picker').bPopup({
    transition: "slideDown",
    speed: 600,
    modalClose: false,
    escClose: false,
    onClose: function(){
          $('#arrow-keys-modal').bPopup({
            transition: "slideDown",
            opacity: "0.1",
            speed: 2000,
            modalClose: true
          });
        }
    });
    $('#genre-button').on('click', function() {
      console.log("genre= ", $('#genre-select').val());
      $('#genre-picker').bPopup().close();
  });
  /*$('element_to_pop_up').bPopup({
    onClose: function(){
      // doMagic 
    }
  });*/
 $('#new-genre').on('click', function(e) {
  e.preventDefault();
    $('#genre-picker').bPopup({
      transition: "slideDown",
      speed: 400
    });
  });
 $('#test-song').on('click', function(e) {
  e.preventDefault();
  $('#current-song').bPopup({
    transition: "slideUp",
    opacity: "0.1",
    speed: 400
  });
  });

  $('#error_explanation').parents('#signup-box').css('height','580px');

});


var animation_duration = 700;

function animateMenuIn() {
  $side_menu = $('#playlist-menu');
  $side_menu.stop().animate({
      right: '0px'
    },
    animation_duration,
    function() {
      $side_menu.addClass('active');
    }
  );
}

function animateMenuOut() {
  $side_menu = $('#playlist-menu');
  $side_menu.stop().animate({right: '-180px'}, animation_duration);
  $side_menu.removeClass('active');
}

function animateRankingIn() {
  $side_menu = $('#ranking');
  $side_menu.stop().animate({
      left: '0px',
      bottom: '0px'
    },
    animation_duration,
    function() {
      $side_menu.addClass('active');
    }
  );
}

function animateRankingOut() {
  $side_menu = $('#ranking');
  $side_menu.stop().animate({left: '-170px', bottom: '-170px'}, animation_duration);
  $side_menu.removeClass('active');
}