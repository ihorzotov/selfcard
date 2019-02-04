$(document).ready(function () {
//counter animation func
function NumCount( priceStart ,priceEnd,thisEL ){
  var numbStart = priceStart;
      $({ numberValue: priceEnd}).animate({numberValue: numbStart}, {
          duration: 400,
          easing: "linear",
          
          step: function(val) {
            thisEL.parents('.price-card').find('.num-js').html(val.toFixed(0));
          }
        });
};
//

//price count animation  on click 'switcher', change class="hover" and change tab  ; 
$(document).on('click','.switcher',function(){
  var thisEL = $(this),
      propChecked = thisEL.find('.switcher__input').prop('checked');

      if( thisEL.hasClass('hover') ) {
          thisEL.removeClass('hover');
          thisEL.mouseout(function(){
            thisEL.addClass('hover')
          });
      };

      if( thisEL.hasClass('js-price-animation') ) {
          var disabledPrice = +thisEL.find('.js-switcher-disabled').attr('data-price'),
              checkedPrice = +thisEL.find('.js-switcher-checked').attr('data-price');

              if( propChecked == true ) {
                  NumCount( checkedPrice, disabledPrice, thisEL);
              }else{
                  NumCount( disabledPrice, checkedPrice, thisEL)
              };
      }else if( thisEL.hasClass('js-tab-switcher') ){
                if( propChecked == true ){
                    thisEL.parents('.js-switcher-parent').addClass('active')
                }else{
                    thisEL.parents('.js-switcher-parent').removeClass('active')
                }
                
      };

});

// click function
(function(){

  // close modal
  $('.close-modal').click(function(){
    $(this).parents('.modal').removeClass('active changing');
    $('body,html').removeClass('overflow');
    $('.slide-element').removeClass('changing')
  });

  // header support dropdown
  $('.js-dropdown-button').click(function(){
    $(this).parents('.header-list__item.dropdown').toggleClass('active');
  });

  //header authentication dropdown
  $('.header-authentication__content').click(function(){
    $(this).parents('.header-authentication').toggleClass('active');
  });

  // copy to clipboard
  $('.js-copy').click(function(){
    var text = $(this).parents('.constructor-styles__link').find('.form-block__input');
  
        text.attr('disabled', false).select();
        document.execCommand("copy");
        text.attr('disabled', true);
        window.getSelection().removeAllRanges();

  });

  // make link from input
  $('.js-input--link').click(function(){
    var text = $(this).find('.form-block__input');
    
        text.attr('disabled', false);
        window.open(text.val(), '_blank');
        text.attr('disabled', true);
  });
  function radioButton(element,item){
    var clickElement = element,
        thisAccess = $(item).attr('data-access');

        if( thisAccess != 0 ) {
            $('.modal.active '+clickElement+'').removeClass('active');
            $(item).addClass('active');
        };
  };

  // show buy a pro
 $(document).on('click','[data-access="0"]', function(){
    modalTemplatesAppend('pro-access');
    $('.modal.active .js-save-modal').hide();
 });

  // align-block__content click
  $(document).on('click','.align-block__content',function(){
    radioButton('.align-block__content',this);
  });

  // social-list__item click
  $(document).on('click','.social-list__item',function(){
    radioButton('.social-list__item',this);
  });

  // text-style__circle click
  $(document).on('click','.text-style__circle',function(){
    radioButton('.text-style__circle',this);
  });
  // js-signature__checkbox click

  $(document).on('click','.js-signature__checkbox',function(){
    var propChecked = $(this).prop('checked');

        if( propChecked == true ) {
            $('.modal.active .js-signature').removeClass('disabled');
        }else{
            $('.modal.active .js-signature').addClass('disabled');
        }
  });

  // show alert dropdown
  $('.header-alert').click(function(){
    $(this).toggleClass('active');
  });

  // faq tabs
  $('.faq-aside__item').on('click', function(){
    var parentsID = $(this).attr('id');

        $('.faq-aside__item').removeClass('active');
        $(this).addClass('active');
        $('.faq-content').removeClass('active');
        $('.faq-content[data-target="'+parentsID+'"]').addClass('active');
  });


}());
//
// questions-block click
  $('.questions-block__title').click(function(){
    $('.questions-block').not($(this).parents('.questions-block')).removeClass('active');
    $(this).parents('.questions-block').toggleClass('active');
  });

// aside floating arrow
  if( $(window).width() > 1140 ) {
      $('.faq-aside__item').hover(function(){
        var childHeight = $(this).find('.text').height() / 2,
            position = $(this).find('.text').position().top + childHeight;

            $('.aside-hover__arrow').css({'top': position});
      });

      $('.faq-aside').on('mouseleave',function(){
        var activeChildHeight = $(this).find('.faq-aside__item.active .text').height() / 2;
            activeChildPosition = $(this).find('.faq-aside__item.active .text').position().top + activeChildHeight;

            $('.aside-hover__arrow').css({'top': activeChildPosition});
      });
  }
//

function modalTemplatesAppend(target){
  var contentType = $('.modal-templates').find('.modal-templates__content[data-target='+target+']');
  $('.js-appendEl-holder').html("");
  $('.modal.constructor-modal').addClass('active');
  $('body,html').addClass('overflow');
  contentType.clone().appendTo('.js-appendEl-holder');
  $('.modal.active').attr('data-content-type',contentType.attr('data-type'));
};

// change styles on click "style-tab__block", make it radio button and open modal with templates;
  $('.style-tab__block').click(function(){
    var thisEL = $(this);

        if( thisEL.hasClass('js-block-radio') ) {
            $('.js-block-radio').removeClass('active');
            thisEL.addClass('active');
        }else if( thisEL.hasClass('js-modal-templates') ){
                  var thisID = thisEL.attr('id');

                      modalTemplatesAppend(thisID);
                      $('.modal.active').attr('data-current',thisID).end().find('.js-save-modal').show();
        };
  });
// open modal with templates on click slide-element;
$(document).on('click','.slide-element',function(){
  var thisData = $(this).data('target');

      $(this).addClass('changing');
      modalTemplatesAppend(thisData);
      $('.modal.active').addClass('changing').attr('data-current',thisData).end().find('.js-save-modal').show();
      
});
//

// custom select 
$('.wrap-drop').each(function(key,item){
  var selectedText = $(item).find('.selected').text();

      $(item).find('.selected-el span').text(selectedText);
      $(item).find('li[data-access=0]:first').css({
        'border-radius':'24px 24px 0 0',
      });
});
$(document).on('click','.wrap-drop',function(){
  $('.wrap-drop.active').not(this).css({
    "transition-delay": "0s",
  });
  $('.wrap-drop').not(this).removeClass('active');
  $(this).toggleClass('active');
});
$(document).on('click','.drop>li',function(){
  var attribute = $(this).attr('data-access');

      if( attribute != 0 ) {
          var thisText = $(this).text();

              $(this).addClass('selected').siblings().removeClass('selected');
              $(this).parents('.wrap-drop').find('.selected-el span').text(thisText);
      }
});
//

$(document).on('click', function(event){
  var if_thisbutton = $(event.target).hasClass('wrap-drop.active')? true: $(event.target).parents('.wrap-drop.active').length > 0? true: false;
      
      if( !if_thisbutton ){
          $('.wrap-drop').removeClass('active');
      }
});
// 

// tooltip
  $(document).on('click','.tooltip-button__js',function(){
    var tooltipStatus = $(this).attr('data-tooltip'),
        thisEl = $(this);
        if( tooltipStatus != 0 ){
            var thisText = thisEl.attr('data-tooltip__text');
                
                $('.tooltip').toggleClass('active').find('.text').html(thisText);
                
                function givePosition(){
                  if( $('.tooltip').hasClass("active") ) {
                      var thisOffset = thisEl.offset(),
                          thisHeight = thisEl.height()+14,
                          thisWidth = thisEl.outerWidth()/2 - $('.tooltip').outerWidth()/2;

                          $('.tooltip').css({
                            "top": (thisOffset.top +thisHeight)+"px" ,
                            'left':(thisOffset.left +thisWidth)+"px",
                          });
                      };
                };
                givePosition();

                $(window).resize(function(){
                  givePosition();
                });

                if( $('.modal').hasClass('active') ) {
                    $('.modal').scroll(function(){
                      givePosition();
                    });
                  };
        };
  });
// disable tooltip on click document
$(document).on('click', function(event){
  var if_neededelement = $(event.target).parent('.tooltip').length;
  var if_thisbutton = $(event.target).hasClass('tooltip-button__js')? true: $(event.target).parents('.tooltip-button__js').length > 0? true: false;
      if(!if_thisbutton && !if_neededelement){
        $('.tooltip').removeClass('active');
      }
});

// upload img
function readURL(input) {
  if( input.files && input.files[0] ) {
      var reader = new FileReader();

          reader.onload = function(e) {
              $(input).parents('.file-uploader').find('.js-img-holder').attr('style','background-image: url('+e.target.result +')');
              $(input).parents('.file-uploader').find('.js-img-holder').hide();
              $(input).parents('.file-uploader').find('.js-img-holder').fadeIn(650);
          }
          reader.readAsDataURL(input.files[0]);
  }
};

$(document).on("change", ".js-input-file", function() {
  readURL(this);
  $(this).attr('disabled',true);
  $(this).parents('.js-uploader').addClass('active').hide().fadeIn(650).css({
    'order':'-1',
  });
});

$(document).on('click','.remove-button', function(){
  $(this).parents('.js-uploader').remove();
  $(document).find('.gallery-card__stock').clone().removeClass('gallery-card__stock').appendTo('.modal.active .gallery-block .template-personal').hide().fadeIn(650);

});
//

// save modal and append content to visual constructor
$(document).on('click','.js-save-modal',function(){
  var parentsContentType = $(this).parents('.modal.active').attr('data-content-type'),
      appendContent;
      
      // avatar append
      if( parentsContentType == 'Avatar') {
        var elementLength = $('.slide-element.self').length;
          if( elementLength <= 3 ){
              var bgSource = $('.modal.active .js-img-holder').css('background-image'),
                  imageSize = $('.modal.active .js-image-size li.selected').attr('data-size'),
                  signatureCheckbox = $('.modal.active .js-signature__checkbox').prop('checked'),
                  fontSize = $('.modal.active .js-font-size li.selected').attr('data-size'),
                  inputText = $('.modal.active .form-block__input').val();
                  signature = (signatureCheckbox == true)? '<p class="self__name">'+inputText+'</p>':'',
                  className = ' img'+imageSize+' fs'+fontSize;

              bgSource = bgSource.replace('url(','').replace(')','').replace(/\"/gi, "");

                  appendContent = '<div class="slide-element self '+className+'" data-target="modal-avatar">\
                                <div class="slide-element__button"><img src="../img/slide-element__button.svg" alt=""></div>\
                                <div class="self__photo" style="background-image: url('+bgSource+');"></div>\
                                '+signature+'\
                               </div>';
          }else{
            //сообщение об ошибке
          }
      }  //button append
      else if( parentsContentType == 'Button') {
               var buttonAction = $('.modal.active .js-button-action li.selected').attr('data-action'),
                   buttonLink = $('.modal.active .js-button-link .form-block__input').val(),
                   buttonName = $('.modal.active .js-button-name .form-block__input').val(),
                   fontSize = $('.modal.active .js-font-size li.selected').attr('data-size'),
                   fontFamily = $('.modal.active .js-font-family li.selected').attr('data-font'),
                   textStyle = $('.modal.active .js-font-style .text-style__circle.active').attr('data-style'),
                   className = ' fs'+fontSize+ ' ff-'+fontFamily+ ' text-style-'+textStyle,
                   appendContent = '<div class="slide-element link-block '+className+'" data-target="modal-button">\
                                      <div class="slide-element__button"><img src="../img/slide-element__button.svg" alt=""></div>\
                                      <a href="'+buttonAction+buttonLink+'" class="button-style button-style--black">'+buttonName+'</a>\
                                    </div>';

               
      } // text append
      else if( parentsContentType == 'Text') {
               var fontFamily = $('.modal.active .js-font-family li.selected').attr('data-font'),
                   fontSize = $('.modal.active .js-font-size li.selected').attr('data-size'),
                   textAlign = $('.modal.active .js-text-align .align-block__content.active').attr('data-align'),
                   textareaText = $('.modal.active .js-textarea-text .form-block__input').val(),
                   textStyle = $('.modal.active .js-font-style .text-style__circle.active').attr('data-style'),
                   className = ' fs'+fontSize+ ' ff-'+fontFamily+ ' text-style-'+textStyle+' text-align-'+textAlign,
                   appendContent = '<div class="slide-element text-block '+className+'" data-target="modal-text">\
                                      <div class="slide-element__button"><img src="../img/slide-element__button.svg" alt=""></div>\
                                      <p class="text">'+textareaText+'</p>\
                                    </div>';


      } // separator append
      else if( parentsContentType == 'Separator') {
               var lineType = $('.modal.active .js-line-type li.selected').attr('data-line-type'),
                   hiddenLine = ($('.modal.active .js-hidden-line .hidden-line__checkbox').prop('checked') == true)? 'hidden' : 'show',
                   topMargin = $('.modal.active .js-top-margin li.selected').attr('data-top'),
                   bottomMargin = $('.modal.active .js-bottom-margin li.selected').attr('data-bottom'),
                   lineWidth = $('.modal.active .js-line-width li.selected').attr('data-width'),
                   className = ' line-type-'+lineType+ ' line-'+hiddenLine+ ' top-margin-'+topMargin+' bottom-margin-'+bottomMargin+' line-width-'+lineWidth,
                   appendContent = '<div class="slide-element separator-block '+className+'" data-target="modal-separator">\
                                      <div class="slide-element__button"><img src="../img/slide-element__button.svg" alt=""></div>\
                                      <hr>\
                                    </div>';


//       }// gallery append
//       else if( parentsContentType == 'Gallery') {
//                var checkedStatus = $('.modal.active .resolution__switcher .switcher__input').prop('checked');
//                    resolutionVal = (checkedStatus == false)? $('.modal.active .resolution__switcher .switcher-text:first').text() : $('.modal.active .resolution__switcher .switcher-text:last').text(),
//                    linkHolder=[],
//                    sliderChange = $('.modal.active .slider-change .slider-change-prop').prop("checked"),
//                    //sliderChangeVal = (sliderChange == false)? null : sliderChange,
//                    sliderAutoplay = $('.modal.active .js-autoplay-time li.selected').data('time'),
//                    asd = (sliderChange == false)? 0: sliderAutoplay;

//                     $('.modal.active .js-uploader.active').each(function(key,item){
//                       var bgSource = $(item).find('.js-img-holder').css('background-image').replace('url(','').replace(')','').replace(/\"/gi, "");
//                           linkHolder.push(bgSource);
//                     });

//                 var appendContent = '<div class="slide-element gallery-block small">\
//                                       <div class="slide-element__button"><img src="../img/slide-element__button.svg" alt=""></div>\
//                                       <div class="gallery-slider" data-autoplay="'+sliderChange+'"  data-autoplay-time="'+asd+'">\
//                                         <div class="gallery-slider__holder">\
//                                           <div class="gallery-slider__element" style="background-image: url(../img/telegram.svg);"></div>\
//                                         </div>\
//                                         <div class="gallery-slider__holder">\
//                                           <div class="gallery-slider__element" style="background-image: url(../img/telegram.svg);"></div>\
//                                         </div>\
//                                         <div class="gallery-slider__holder">\
//                                           <div class="gallery-slider__element" style="background-image: url(../img/telegram.svg);"></div>\
//                                         </div>\
//                                       </div>\
//                                     </div>';

//       }// video append
      else if( parentsContentType == 'Video') {
               var videoSource = $('.modal.active .js-video-src .form-block__input').val();
               var appendContent = '<div class="slide-element video-block" data-target="modal-video">\
                                      <div class="slide-element__button"><img src="../img/slide-element__button.svg" alt=""></div>\
                                      <div class="video-block__iframe">\
                                        <iframe src="'+getVideoId(videoSource)+'" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\
                                      </div>\
                                    </div>';


      };

   $('.page-wrapper').append(appendContent);
   $('.modal,body,html').removeClass('active overflow');
});




// add shadow to alert-block when element is overflowd
(function (){
  var elementOverflowHeight = $('.alert-block__content').height(),
      elementRealHeight = $('.alert-block__content').prop('scrollHeight');

      if( elementOverflowHeight != elementRealHeight ) {
          $('.alert-block').addClass('alert-block--shadow');
      }else{
          $('.alert-block').removeClass('alert-block--shadow');
      };
}());

function initSliders(){
  $('.slide-element .gallery-slider').each(function(key,item){
    var autoplayStatus = $(item).data('autoplay'),
        autoplayTime = +$(item).data('autoplay-time')*1000;

        $(item).slick({
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots:true,
          arrows:false,
          autoplay: autoplayStatus,
          autoplaySpeed: autoplayTime,
        });
        
  });
}
initSliders();



// settings fields change button 

function fieldsActivation (thisEl,change,formInput){
  // ie
  // if (!change) {
  //   change = 0;
  // }
  var label = thisEl.parents('.settings-fields__block').find('.form-block__label');
      
      if( change == 0 ) {
          label.removeClass("disabled");
          formInput.prop('disabled',false).first().focus();
      }else{
          label.addClass("disabled");
          formInput.prop('disabled',true);
      }
}
// fields-change__btn
(function(){
  var defaultValue;

      $('.fields-change__btn').on("click",function(){
        var thisEl = $(this),
            formInput = thisEl.parents('.settings-fields__block').find('.form-block__input');
            
         
            if( thisEl.parents('.settings-fields__block').attr('data-access') != 0){
                thisEl.parents('.button-swap').toggleClass('change');

                if( thisEl.hasClass('js-fields-change') ){
                    defaultValue = formInput.first().val();
                    fieldsActivation(thisEl,0,formInput);
                    thisEl.parents('.settings-fields__block').find('.password-confirmation .form-block__input').val('');
                }else if( thisEl.hasClass('js-fields-clear') ){
                          formInput.first().val(defaultValue);
                          fieldsActivation(thisEl,1,formInput);
                }else if( thisEl.hasClass('js-fields-save') ){
                          fieldsActivation(thisEl,1,formInput);
                }
            }
      });
}());//

// show-password button 
  $('.show-password').on('click',function(){
    var thisParents = $(this).parents('.fields-content');
        $(this).toggleClass('active');
        thisParents.toggleClass('password-text');
        if( thisParents.hasClass('password-text') ){
            thisParents.find('.form-block__input').prop('type','text');
        }else{
            thisParents.find('.form-block__input').prop('type','password');
        }
  });

// // floating text on keyup
// (function(){
//   function createstars(n) {
//     var stars = "";
//         for (var i = 0; i < n; i++) {
//           stars += "*";
//         }
//         return stars;
//   }
//   var classStatus,
//       timer = "";
//       $('.js-keyup-text .form-block__input').on('focus',function(){
//          if( $(this).parents('.fields-content').hasClass('password-text') ) {
//              classStatus = 1;
//          }else{
//              classStatus = 0;
//          }
//       });
      
//       $('.js-keyup-text .form-block__input').on('keyup',function(e){
//         if( classStatus == 0 ) {
//             var thisEl = $(this),
//                 code = e.which;

//                 if( code == 8 ) {
//                     var length = thisEl.val().length;
//                 } else if (code == 37) {

//                 } else {
//                   var current_val = thisEl.val().length;
//                       thisEl.val(createstars(current_val - 1) + thisEl.val().substring(current_val - 1));
//                 }

//                 clearTimeout(timer);
//                 timer = setTimeout(function() {
//                   thisEl.val(createstars(thisEl.val().length));
//                 }, 200);
//         }
//         console.log($(this).val());
//       });
      
// }());


//save modal and append content to visual constructor
$(document).on('click','.js-save-modal',function(){
  var parentsContentType = $(this).parents('.modal.active').attr('data-content-type');
  window['get'+parentsContentType+'Data']();

  $('.modal,body,html').removeClass('active overflow changing');
});
  // modal remove button
  $('.constructor-modal .remove-button').click(function(){
     var parentsAttr = $(this).parents('.modal.changing').attr('data-current');

         $('.slide-element.changing[data-target="'+parentsAttr+'"]').remove();
         $('.modal , .slide-element , body,html').removeClass('active changing overflow');
  });



});//document ready;

// avatar obj
function getAvatarData(){
  var bgSource = $('.modal.active .js-img-holder').css('background-image').replace('url(','').replace(')','').replace(/\"/gi, ""),
      signatureCheckbox = $('.modal.active .js-signature__checkbox').prop('checked'),
      signatureText = $('.modal.active .form-block__input').val(),
      data = {
        type: 'avatar',
        imageSource: bgSource,
        imageSize: $('.modal.active .js-image-size li.selected').attr('data-size'),
        fontSize: $('.modal.active .js-font-size li.selected').attr('data-size'),
        signature: (signatureCheckbox == true)? (signatureText == "")? null : signatureText : null,
      };

  console.log(data);

  ajaxContentGet(data);
};
// button obj
function getButtonData(){
  var buttonLinkText = $('.modal.active .js-button-link .form-block__input').val(),
      buttonNameText = $('.modal.active .js-button-name .form-block__input').val(),
      textStyleAttr = $('.modal.active .js-font-style .text-style__circle.active').attr('data-style'),
      data = {
          type: 'button',
          buttonAction: $('.modal.active .js-button-action li.selected').attr('data-action'),
          buttonLink: (buttonLinkText == "")? null : buttonLinkText,
          fontSize : $('.modal.active .js-font-size li.selected').attr('data-size'),
          fontFamily : $('.modal.active .js-font-family li.selected').attr('data-font'),
          textStyle : (textStyleAttr === undefined)? null : textStyleAttr,
          buttonName : (buttonNameText == "")? null : buttonNameText,
      };
  console.log(data);

  ajaxContentGet(data);
};
// text obj
function getTextData(){
  var textStyleAttr = $('.modal.active .js-font-style .text-style__circle.active').attr('data-style'),
      textareaText = $('.modal.active .js-textarea-text .form-block__input').val(),
      data = {
        type: 'text',
        fontFamily : $('.modal.active .js-font-family li.selected').attr('data-font'),
        fontSize : $('.modal.active .js-font-size li.selected').attr('data-size'),
        textAlign : $('.modal.active .js-text-align .align-block__content.active').attr('data-align'),
        textarea: (textareaText == "")? null : textareaText ,
        textStyle : (textStyleAttr === undefined)? null : textStyleAttr ,
      };

  console.log(data);

  ajaxContentGet(data);
};
// separator obj
function getSeparatorData(){
  var data = {
        type: 'separator',
        hiddenLine: $('.modal.active .js-hidden-line .hidden-line__checkbox').prop('checked'),
        lineType: $('.modal.active .js-line-type li.selected').attr('data-line-type'),
        topMargin: $('.modal.active .js-top-margin li.selected').attr('data-top'),
        bottomMargin: $('.modal.active .js-bottom-margin li.selected').attr('data-bottom'),
        lineWidth: $('.modal.active .js-line-width li.selected').attr('data-width'),

      };

  console.log(data);

  ajaxContentGet(data);
};
// messenger obj
function getMessengerData(){
  var textStyleAttr = $('.modal.active .js-font-style .text-style__circle.active').attr('data-style'),
      buttonNameText = $('.modal.active .js-button-name .form-block__input').val(),
      linkValueText = $('.modal.active .js-link-value.active .form-block__input').val(),
      data = {
        type: 'messenger',
        selectedMessenger: $('.modal.active .js-selected-messenger .social-list__item.active').attr('data-selected'),
        fontFamily : $('.modal.active .js-font-family li.selected').attr('data-font'),
        fontSize : $('.modal.active .js-font-size li.selected').attr('data-size'),
        textStyle : (textStyleAttr === undefined)? null : textStyleAttr ,
        buttonName : (buttonNameText == "")? null : buttonNameText,
        linkValue : (linkValueText === undefined || linkValueText === "")? null : linkValueText,
      };

  console.log(data);

  ajaxContentGet(data);
};
// social obj
function getSocialData(){
  var textStyleAttr = $('.modal.active .js-font-style .text-style__circle.active').attr('data-style'),
      buttonNameText = $('.modal.active .js-button-name .form-block__input').val(),
      linkValueText = $('.modal.active .js-link-value .form-block__input').val(),
      data = {
        type: 'social',
        selectedMessenger: $('.modal.active .js-selected-messenger .social-list__item.active').attr('data-selected'),
        fontFamily : $('.modal.active .js-font-family li.selected').attr('data-font'),
        fontSize : $('.modal.active .js-font-size li.selected').attr('data-size'),
        textStyle : (textStyleAttr === undefined)? null : textStyleAttr ,
        buttonName : (buttonNameText == "")? null : buttonNameText,
        linkValue : (linkValueText === undefined || linkValueText === "")? null : linkValueText,
      };

  console.log(data);

  ajaxContentGet(data);
};
//gallery obj
function getGalleryData(){
  var checkedStatus = $('.modal.active .resolution__switcher .switcher__input').prop('checked');
      resolutionVal = (checkedStatus == false)? $('.modal.active .resolution__switcher .switcher-text:first').attr('data-size') : $('.modal.active .resolution__switcher .switcher-text:last').attr('data-size'),
      linkHolder=[],
      sliderChange = $('.modal.active .slider-change .slider-change-prop').prop("checked"),
      //sliderChangeVal = (sliderChange == false)? null : sliderChange,
      sliderAutoplay = $('.modal.active .js-autoplay-time li.selected').data('time');

      $('.modal.active .js-uploader.active').each(function(key,item){
        var bgSource = $(item).find('.js-img-holder').css('background-image').replace('url(','').replace(')','').replace(/\"/gi, "");
            linkHolder.push(bgSource);
      });

      data = {
        type: 'gallery',
        resolution: resolutionVal,
        galleryLinks:linkHolder,
        autoplay: sliderChange,
        autoplayTime: (sliderChange == false)? 0 : sliderAutoplay,
      }

  console.log(data);

  ajaxContentGet(data);
};
// // get video ID
function getVideoId( url ) {
  var match = /vimeo.*\/(\d+)/i.exec( url );
  // vimeo id
  if ( match ) {
    return 'https://player.vimeo.com/video/'+match[1];
  }// youtube id
  else{
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return 'https://www.youtube.com/embed/'+match[2];
    } else {
      return null;
    }
  }
};

function getVideoData(){
   var videoSrc = $('.modal.active .js-video-src .form-block__input').val();
      var data = {
        type: 'video',
        videoLink: getVideoId(videoSrc),
      };

  console.log(data);
  ajaxContentGet(data); 
};

function ajaxContentGet(data){
  // AJAX CALL
};
