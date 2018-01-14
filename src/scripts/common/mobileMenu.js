$('#burgermenu').on('click', function() {
    console.log('!!!');
    $( "#mobile-menu" ).fadeIn( "slow", function() {
        // Animation complete
      });
})

$('#close-mobile-menu').on('click', function() {
    $( "#mobile-menu" ).fadeOut( "slow", function() {
        // Animation complete
      });
})