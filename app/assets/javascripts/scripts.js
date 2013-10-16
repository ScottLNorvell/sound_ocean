$(document).ready(function() {
  $('#simple-menu').sidr();
  $('#left-menu').sidr({
    name: 'sidr-left',
    side: 'left' // By default
  });
  $('#right-menu').sidr({
    name: 'sidr-right',
    side: 'right'
  });
  $('#existing-content-menu').sidr({
    name: 'sidr-existing-content',
    source: '#demoheader, #demo-content'
  });
  $('#remote-content-menu').sidr({
    name: 'sidr-remote-content',
    source: 'http://www.example.com/remote-menu.html'
  });
  $('#callback-menu').sidr({
    name: 'sidr-callback',
    source: function(name) {
      return '<h1>' + name + ' menu</h1><p>Yes! You can use a callback too ;)</p>';
    }
  });

});