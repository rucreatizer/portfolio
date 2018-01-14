if ($('.blur__back').length !=0) {
  $(window).resize(function(){
    blur();
  });

  $(document).ready(function(){
    blur();
  });

  function blur() {
    var imgWidth = $('.blur__back').width(),
        blurSection = $('.works__reviews'),
        blur = $('.blur__feedback'),
        posY = blurSection.offset().top - blur.offset().top, //   текущее положение элемента относительно документа.
        posX = blurSection.offset().left - blur.offset().left;
    blur.css({
        'background-size': imgWidth + 'px' + ' ' + 'auto',
        'background-position': posX + 'px' + ' ' + posY + 'px'
    })
  }
}