//Перевёртыш
$('#auth').on('click', function() {
    $('.back').toggleClass('hid');
    $('.front').toggleClass('hid');
})

$('#auth').on('click', function() {
    $('.front').toggleClass('flipped', function() {
        console.log('!!!');
    });
    console.log('!!!!');
    $('.back').toggleClass('flipped');
    // $('#auth').addClass('hidden');
    $('#auth').fadeOut();
})

$('#to_main').on('click', function() {
    this.preventDefault;
    $('.front').toggleClass('flipped', function() {
    });
    $('.back').toggleClass('flipped');
    $('#auth').fadeIn();
})