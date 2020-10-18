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
  
const sliderCard = document.querySelectorAll('.category-img');
var i = 0;
const a = document.querySelector('.slider-info-img');
function randomColor()
{
    var letters = '0123456789ABCDEF';
    var color = '#';
    for(var i=0; i<6; i++)
    {
        color += letters[(Math.floor(Math.random()*16))] ;
    }
    return color;
}
for(i = 0 ; i < sliderCard.length; i++){
    sliderCard[i].style.backgroundColor = '#ebeff1';
}