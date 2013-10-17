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
  // $( "#user_nav" ).dialog();

// $(function() {
    $( ".modal-box" ).dialog({
      // autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });
 
    // $( "#sign-up-link" ).click(function() {
    //   $( "#signup-modal" ).dialog( "open" );
    // });
    // $( "#sign-in-link" ).click(function() {
    //   $( "#signin-modal" ).dialog( "open" );
    // });
    $( "#modal-link" ).click(function(e) {
        e.preventDefault();      
      $( "#modal-test-div-id" ).dialog( "open" );
    });
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

// $( "#sign-up" ).dialog({
//       autoOpen: false,
//       show: {
//         effect: "blind",
//         duration: 1000
//       },
//       hide: {
//         effect: "explode",
//         duration: 1000
//       }
//  });
 
    $( "#sign-up-path" ).click(function() {
      $( "#sign-up" ).dialog( "open" );
    });
}
function animateRankingOut() {
  $side_menu = $('#ranking');
  $side_menu.stop().animate({left: '-170px', bottom: '-170px', opacity: 0.5}, animation_duration);
  $side_menu.removeClass('active');
}