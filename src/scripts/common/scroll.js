let scrollMenu = (function() {
    const $news = $('.news');
    const $item = $('.menu__item');
    const $wrapMenu = $('.wrap-menu');
    let positionArticle = [];
    let offsetHeight = 0; // смещение реагирования на сменю меню
  
    _setPositionArticle = function(element) {
      const len = element.length;
      element.each(function(item) {
        positionArticle[item] = {};
        positionArticle[item].top = $(this).offset().top - offsetHeight;
        positionArticle[item].bottom =
          positionArticle[item].top + $(this).innerHeight();
      });
      // console.log(positionArticle);
    };
  
    _scrollPageFixMenu = function(e) {
      let scroll = window.pageYOffset;
      if (scroll < $news.offset().top) {
        $wrapMenu.removeClass('fixed');
      } else {
        $wrapMenu.addClass('fixed');
      }
    };
  
    _scrollPage = function(e) {
      let scroll = window.pageYOffset;
      positionArticle.forEach( (element, index) => {
        if (
          scroll >= element.top &&
          scroll <= element.bottom
        ) {
          $item
            .eq(index)
            .addClass('menu__item--active')
            .siblings()
            .removeClass('menu__item--active');
        }
      });
    };
  
    _clickMenu = function(e) {
      let $element = $(e.target);
      let index = $element.index();
      let sectionOffset = positionArticle[index].top;
  
      $(document).off('scroll', _scrollPage);
      $element.siblings().removeClass('menu__item--active');
      $('body, html').animate(
        {
          scrollTop: sectionOffset
        },
        1000,
        () => {
          $element.addClass('menu__item--active');
          $(document).on('scroll', _scrollPage);
        }
      );
    };
  
    addListener = function() {
      $('.menu').on('click', _clickMenu);
      $(document).on('scroll', _scrollPage);
      $(document).on('scroll', _scrollPageFixMenu);
  
      _setPositionArticle($news);
  
      $(window).on('load', function(e) {
        _setPositionArticle($news);
      });
  
      $(window).on('resize', function(e) {
        _setPositionArticle($news);
      });
  
    };
  
    return {
      init: addListener
    };
  })();
  
  console.log(scrollMenu);
  scrollMenu.init();
  