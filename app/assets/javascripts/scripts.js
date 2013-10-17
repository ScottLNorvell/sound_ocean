$(document).ready(function() {

  $('#side-menu').hover(function() {
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
    speed: 400,
    opacity: "0.4",
    modalClose: false,
    escClose: false
    });
    $('#genre-button').on('click', function() {
      console.log("genre= ", $('#genre-select').val());
      $('#genre-picker').bPopup().close();
  });
    
 $('#new-genre').on('click', function(e) {
  e.preventDefault();
    $('#genre-picker').bPopup({
      transition: "slideDown",
      speed: 400,
      opacity: "0.4"
    });
  });
 $('#test-song').on('click', function(e) {
  e.preventDefault();
  $('#current-song').bPopup({
    transition: "slideUp",
    speed: 400,
    opacity: "0.1"
  });
  });
});


var animation_duration = 700;

function animateMenuIn() {
  $side_menu = $('#side-menu');
  $side_menu.stop().animate({
      right: '0px',
      opacity: 1
    },
    animation_duration,
    function() {
      $side_menu.addClass('active');
    }
  );
}

function animateMenuOut() {
  $side_menu = $('#side-menu');
  $side_menu.stop().animate({right: '-180px', opacity: 0.5}, animation_duration);
  $side_menu.removeClass('active');
}

function animateRankingIn() {
  $side_menu = $('#ranking');
  $side_menu.stop().animate({
      left: '0px',
      bottom: '0px',
      opacity: 1
    },
    animation_duration,
    function() {
      $side_menu.addClass('active');
    }
  );
}

function animateRankingOut() {
  $side_menu = $('#ranking');
  $side_menu.stop().animate({left: '-170px', bottom: '-170px', opacity: 0.5}, animation_duration);
  $side_menu.removeClass('active');
}