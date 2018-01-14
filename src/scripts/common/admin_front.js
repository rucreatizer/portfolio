$('#item1').on('click', function() {
    $('#page2').addClass('block__hidden');
    $('#page3').addClass('block__hidden');
    $('#page1').removeClass('block__hidden');
})

$('#item2').on('click', function() {
    $('#page1').addClass('block__hidden');
    $('#page3').addClass('block__hidden');
    $('#page2').removeClass('block__hidden');
})

$('#item3').on('click', function() {
    $('#page1').addClass('block__hidden');
    $('#page2').addClass('block__hidden');
    $('#page3').removeClass('block__hidden');
})