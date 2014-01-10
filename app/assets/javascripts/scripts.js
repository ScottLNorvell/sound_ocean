
$(document).ready(function() {

  setDeviseButtons();  

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

  var modal_duration = 1000;

  var easing = "easeOutQuint";

  $('#genre-picker').bPopup({
    transition: "slideDown",
    easing: "easeInOutQuad",
    speed: 1000,
    modalClose: false,
    escClose: false,
    onClose: function(){

      $('#arrow-keys-modal').bPopup({
        transition: "slideDown",
        easing: easing,
        opacity: "0",
        speed: modal_duration,
        modalClose: true,
        autoClose: 3500,
        transitionClose: "slideIn",

      });
    }
});

  $('#genre-button').on('click', function() {
    $('#genre-picker').bPopup().close();
  });
 
 $('#new-genre').on('click', function(e) {
    e.preventDefault();
  
    $('#genre-picker').bPopup({
      transition: "slideDown",
      speed: 400,
      opacity: "0"
    });
  
  });

 $('#test-song').on('click', function(e) {

    e.preventDefault();
    $('#current-song').bPopup({
      transition: "slideUp",
      opacity: "0",
      speed: 400,
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
  $side_menu.stop().animate({left: '-200px', bottom: '-200px'}, animation_duration);
  $side_menu.removeClass('active');
}

function setDeviseButtons() {
  $(".ajax-butt").off('click');
  if ($('#devise-container').length > 0){
    $(".ajax-butt").click(function(e) {
      var self = $(this);
      e.preventDefault();

      $.get(self.attr('href'), function(data) {
        
        var html = $(data).filter('.devise-box');
        if (html.length < 1) {
          html = $(data).find('.devise-box');
        }
        $("#devise-container").html(html.eq(0));
        $('.error-div').remove();
        setDeviseButtons();
      })
    });  
  }
  
}