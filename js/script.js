$(document).ready(function () {
// phone animation when document is ready;
$('.pagename-index .phone-block.animation').removeClass('animation');

// .slide-button
$('.slide-button').click(function(){
  $(this).parents('.main-frst').toggleClass('active');
});

// animation counter func
function NumCount( priceStart ,priceEnd,thisEL ){
  var numbStart = priceStart;
      $({ numberValue: priceEnd}).animate({numberValue: numbStart}, {
          duration: 400,
          easing: "linear",
          
          step: function(val) {
            thisEL.parents('.price-card').find('.num-js').html(val.toFixed(0));
          }
        });
}
//
//price count animation  on click 'switcher' and change "hover" class; 
$('.switcher').click(function(){
  var thisEL = $(this),
      propChecked = thisEL.find('.switcher__input').prop('checked'),
      disabledPrice = +thisEL.find('.js-switcher-disabled').attr('data-price'),
      checkedPrice = +thisEL.find('.js-switcher-checked').attr('data-price');

      if( thisEL.hasClass('hover')) {
          thisEL.removeClass('hover');
          thisEL.mouseout(function(){
            thisEL.addClass('hover')
          });
      };

      if( propChecked == true ) {
          NumCount(checkedPrice,disabledPrice,thisEL);
      }else{
          NumCount(disabledPrice,checkedPrice,thisEL)
      };
});

// modal
$('.modal-button').click(function(){
  $('.modal.modal-contact').addClass('active');
  $('body,html').addClass('overflow');
});

// close modal
$('.close-modal').click(function(){
  $(this).parents('.modal').removeClass('active');
  $('body,html').removeClass('overflow')
});

});//document ready;