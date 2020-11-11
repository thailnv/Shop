$('.second-carousel').slick({
    slidesToShow: 5,
    infinite: true,
    slidesToScroll: 1,
    prevArrow: '#pBtn',
    nextArrow: '#nBtn',
  });
  $('.brand-slider').slick({
    slidesToShow: 6,
    infinite: true,
    slidesToScroll: 1,
    prevArrow: '#pBtn',
    nextArrow: '#nBtn',
  });
$('.third-carousel').slick({
    slidesToShow: 4,
    infinite: true,
    slidesToScroll: 1,
    prevArrow: '#p1Btn',
    nextArrow: '#n1Btn',
});
$('.slider-info-img').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  });
  $('.slider-nav').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.slider-info-img',
    focusOnSelect: true,
    arrows: false,
  });
  