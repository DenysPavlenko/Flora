'use strict';

function transitionendEvent () {
  var el = document.createElement('fake');
  var transEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'otransitionend',
    'transition': 'transitionend'
  };

  for (var t in transEndEventNames) {
    if (el.style[t] !== undefined) {
      return transEndEventNames[t];
    }
  }
}

function toggleScrollBar (options) {
  var action = options.action || '';
  var fixedItems = options.fixedItems || [];
  var $window = $(window);
  var $html = $('html');
  var scroolBarWidth;
  var overflow; // Get scroolBarWidth on 'hide' action
  // Set overflow to hidden

  if (action === 'hide') {
    scroolBarWidth = $window.outerWidth() - $html.width();
    overflow = 'hidden';
  } // Set scroolBarWidth to 0 on 'show' action
  // Set overflow to auto
  else if (action === 'show') {
      scroolBarWidth = 0;
      overflow = 'auto';
    } // Set overfloy-y to fixed items on show or hide action


  if (fixedItems.length >= 1) {
    for (var i = 0; i < fixedItems.length; i++) {
      var fixedElem = $(fixedItems[i]);

      if (action === 'hide' && fixedElem.css('position') === 'fixed') {
        fixedElem.css('padding-right', scroolBarWidth + 'px');
      }

      if (action === 'show' && fixedElem.css('position') === 'fixed') {
        fixedElem.css('padding-right', '0px');
      }
    }
  } // Set padding and overflow-y to html


  $('html').css({
    'padding-right': scroolBarWidth + 'px',
    'overflow-y': overflow
  });
}

function navigation () {
  var $frame = $('.frame');
  var $frameLeft = $('.frame__left');
  var $burger = $('.frame__burger');
  var $navigation = $('.navigation');
  var $navigationLink = $('.navigation__link');
  var transitionEnd = transitionendEvent();
  var clicked = false; // Set transition delay to each navigation link

  var transitionDelay = 0;
  $navigationLink.each(function () {
    $(this).css({
      '-webkit-transition-delay': transitionDelay + 's',
      '-moz-transition-delay': transitionDelay + 's',
      '-o-transition-delay': transitionDelay + 's',
      'transition-delay': transitionDelay + 's'
    });
    transitionDelay += 0.02;
  }); // Show ot hide menu on the burger click

  $burger.on('click', function () {
    if (!clicked && !$burger.hasClass('burger--is-active')) {
      showMenu();
    } else if (clicked && $navigationLink.hasClass('navigation__link--is-showed')) {
      hideMenu();
    }
  }); // Show menu function

  function showMenu() {
    $frame.addClass('frame--is-active');
    $burger.addClass('burger--is-active');
    $navigation.addClass('navigation--is-active'); // Set transitionend event to the left frame

    $frameLeft.one(transitionEnd, function () {
      // Hide main scrollbar and show navigation scrollbar
      $navigation.css('overflow-y', 'scroll');
      toggleScrollBar({
        action: 'hide',
        fixedItems: ['.frame__header', '.frame__footer']
      });
      $navigationLink.addClass('navigation__link--is-showed');
    }); // Switch flag to true

    $navigationLink.last().one(transitionEnd, function () {
      clicked = true;
    });
  } // Hide menu function


  function hideMenu() {
    $navigationLink.removeClass('navigation__link--is-showed'); // Set transitionend event to the last nav link

    $navigationLink.last().one(transitionEnd, function () {
      $frame.removeClass('frame--is-active');
      $burger.removeClass('burger--is-active');
      $navigation.removeClass('navigation--is-active'); // Show main scrollbar and hide navigation scrollbar

      $navigation.css('overflow-y', 'hidden');
      toggleScrollBar({
        action: 'show',
        fixedItems: ['.frame__header', '.frame__footer']
      }); // Show scrollbar
    }); // Switch flag to false

    $frameLeft.one(transitionEnd, function () {
      clicked = false;
    });
  } // Hide menu on menu link click


  $navigationLink.on('click', function () {
    hideMenu();
  });
} // import transitionEndName from './transition-name.js';
// import toggleScrollBar from './toggle-scrollbar';
// export default function () {
// 	var $frame = $('.frame');
// 	var $burger = $('.frame__burger');
// 	var $navigation = $('.navigation');
// 	var $navigationLink = $('.navigation__link');
// 	var $frameSocials = $('.frame__socials');
// 	var clicked = false;
// 	var transEndEventName = transitionEndName();
// 	// Set transition delay to each navigation link
// 	var transitionDelay = 0;
// 	$navigationLink.each(function () {
// 		$(this).css({
// 			'-webkit-transition-delay': transitionDelay + 's',
// 			'-moz-transition-delay': transitionDelay + 's',
// 			'-o-transition-delay': transitionDelay + 's',
// 			'transition-delay': transitionDelay + 's',
// 		});
// 		transitionDelay += 0.02;
// 	});
// 	// Show/hide menu on burger click
// 	$burger.on('click', function () {
// 		if (!clicked) {
// 			if (!$burger.hasClass('burger--active')) {
// 				showMenu();
// 			}
// 			else {
// 				hideMenu();
// 			}
// 		}
// 	});
// 	// Hide menu on menu link click
// 	$navigationLink.on('click', function () {
// 		hideMenu();
// 	});
// 	// Show menu
// 	function showMenu() {
// 		clicked = true;
// 		// Burger open animation
// 		$burger.addClass('burger--active');
// 		// Show frame
// 		$frame.addClass('frame--active');
// 		// Show navigation and hide scroll bar on frame transitionend
// 		$frame.find('.frame__left').one(transEndEventName, function (e) {
// 			// Show navigation
// 			$navigation.addClass('navigation--active');
// 			// Show navigation links
// 			$navigationLink.addClass('navigation__link--showed');
// 			// Hide scrollbar
// 			toggleScrollBar({
// 				action: 'hide',
// 				fixedElems: [$burger, $frameSocials]
// 			});
// 			// Set clicked to false
// 			$navigationLink.last().one(transEndEventName, function (e) {
// 				clicked = false;
// 			});
// 		});
// 	}
// 	// Hide menu
// 	function hideMenu() {
// 		clicked = true;
// 		// Burger close animation
// 		$burger.removeClass('burger--active');
// 		// Hide navigation links
// 		$navigationLink.removeClass('navigation__link--showed');
// 		// Hide navigation and show scroll bar on navigationLink transitionend
// 		$navigationLink.last().one(transEndEventName, function (e) {
// 			// Hide navigation
// 			$navigation.removeClass('navigation--active');
// 			// Hide frame
// 			$frame.removeClass('frame--active');
// 			// Hide scrollbar
// 			toggleScrollBar({
// 				action: 'show',
// 				fixedElems: [$burger, $frameSocials]
// 			});
// 			// Set clicked to false
// 			$frame.find('.frame__left').one(transEndEventName, function (e) {
// 				clicked = false;
// 			});
// 		});
// 	}
// }

function blog () {
  var $blogBtn = $('.blog__button');
  $blogBtn.on('mouseenter', function () {
    $(this).parent().parent().find('.blog__image').addClass('blog__image--hovered');
  });
  $blogBtn.on('mouseleave', function () {
    $(this).parent().parent().find('.blog__image').removeClass('blog__image--hovered');
  });
}

// Help slider
function map () {
  var map;
  var myLatLng = {
    lat: -33.908476,
    lng: 151.092644
  };
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    scrollwheel: false,
    zoom: 14,
    styles: [{
      "elementType": "geometry",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    }, {
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#8ec3b9"
      }]
    }, {
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1a3646"
      }]
    }, {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#4b6878"
      }]
    }, {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#64779e"
      }]
    }, {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#4b6878"
      }]
    }, {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#334e87"
      }]
    }, {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [{
        "color": "#023e58"
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#283d6a"
      }]
    }, {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#6f9ba5"
      }]
    }, {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#023e58"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#3C7680"
      }]
    }, {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "color": "#304a7d"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#98a5be"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "color": "#2c6675"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#255763"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#b0d5ce"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#023e58"
      }]
    }, {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#98a5be"
      }]
    }, {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1d2c4d"
      }]
    }, {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#283d6a"
      }]
    }, {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [{
        "color": "#3a4762"
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#0e1626"
      }]
    }, {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#4e6d70"
      }]
    }]
  });
  new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Your title'
  });
}

function preloader () {
  $('.preloader').fadeOut();
  $('html, body').css('overflow-y', 'auto');
}

function scrollAnimations () {
  var $items = $('[data-scroll-animation]');
  var windowHeight = $(window).height();
  var bottomOffset = '85%';
  var resizeEnd; // Change windowHeight on resize

  $(window).on('resize', function () {
    clearTimeout(resizeEnd);
    resizeEnd = setTimeout(function () {
      windowHeight = $(window).height();
    }, 100);
  }); // Run scrollAnimation

  scrollAnimation(); // ScrollAnimation on window scroll

  $(window).on('scroll', scrollAnimation); // Scroll animation function

  function scrollAnimation() {
    var windowScrollTop = $(window).scrollTop();
    var windowOffset = windowScrollTop + windowHeight * parseInt(bottomOffset) / 100; // Add animation class to element

    $items.each(function () {
      var elem = $(this);

      if (elem.offset().top <= windowOffset) {
        var animationClass = elem.attr('data-scroll-animation');
        var animationDelay = elem.attr('data-scroll-animation-delay');
        elem.css({
          '-webkit-animation-delay': animationDelay,
          '-mox-animation-delay': animationDelay,
          '-o-animation-delay': animationDelay,
          'animation-delay': animationDelay
        }).addClass(animationClass);
      }
    });
  }
}

function scrollSpy () {
  var $anchorLinks = $('.navigation__link');
  $(window).on('scroll', function () {
    $anchorLinks.each(function () {
      var $this = $(this); // Get section name

      var anchor = $this.attr('href');
      var section = $(anchor); // Offsets

      var windowTop = window.pageYOffset;
      var sectionTop = section.offset().top; // Add or remove an active class from nav link

      if (windowTop > sectionTop - 1) {
        $anchorLinks.removeClass('navigation__link--active');
        $this.addClass('navigation__link--active');
      } else {
        $this.removeClass('navigation__link--active');
      }
    });
  });
}

$(function () {
  navigation();
  scrollSpy();
  blog();
  map();
}); // On window load

$(window).on('load', function () {
  preloader();
  scrollAnimations();
});
