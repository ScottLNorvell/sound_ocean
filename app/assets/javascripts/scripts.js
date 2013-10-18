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

  var modal_duration = 2000;

  $('#genre-picker').bPopup({
    transition: "slideDown",
    speed: 600,
    modalClose: false,
    escClose: false,
    onClose: function(){

      // $('#arrow-keys-modal').bPopup({
      //   transition: "slideDown",
      //   opacity: "0",
      //   speed: modal_duration,
      //   modalClose: true,
      //   position: ['10%','90%'],
      //   positionStyle: 'fixed',
      //   autoClose: 1000,
      //   transitionClose: "slideIn",
      //   onClose: function (){
      //     $('#spacebar-modal').bPopup({
      //     transition: "slideDown",
      //     opacity: "0",
      //     speed: modal_duration,
      //     modalClose: true,
      //     position: ['60%','90%'],
      //     positionStyle: 'fixed',
      //     autoClose: 1000,
      //     transitionClose: "slideBack",
      //       onClose: function (){
      //         $('#navigate-modal').bPopup({
      //         transition: "slideDown",
      //         opacity: "0",
      //         speed: modal_duration,
      //         modalClose: true,
      //         position: ['35%','90%'],
      //         positionStyle: 'fixed',
      //         autoClose: 1000,
      //         transitionClose: "slideUp"
      //         });
      //       }
      //     });
      //   }
      // });
    }
});
/*onClose: function (){
              $('#spacebar-modal').bPopup({
              transition: "slideDown",
              opacity: "0",
              speed: 5000,
              modalClose: true,
              position: ['60%','90%'],
              positionStyle: 'fixed',
              autoClose: 1000,
              transitionClose: "slideBack"
            }*/
  $('#genre-button').on('click', function() {
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
  $side_menu.stop().animate({left: '-170px', bottom: '-170px'}, animation_duration);
  $side_menu.removeClass('active');
}