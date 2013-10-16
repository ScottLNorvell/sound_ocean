$(document).ready(function() {
$('#side-menu').on('click', function() {
    var $this = $(this);
    if($this.hasClass('active')) {
      animateMenuOut();
    } else {
      animateMenuIn();
    }
  });

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

  $( "#side-menu-ul" ).selectable();
  $( "#user_nav" ).dialog();


  // $( '#side-menu' ).hover(function() {
  //   $( "#side-menu" ).toggle( "slide", {direction: 'right'});
  // });

});


var animation_duration = 700;

function animateMenuIn() {
  $side_menu = $('#side-menu');
  $side_menu.stop().animate({
      right: '0px',
      opacity: 1
    },
    animation_duration, 'easeInOutQuart',
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
    animation_duration, 'easeInOutQuart',
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