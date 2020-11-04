import transitionendEvent from './transitionend-event';
import toggleScrollBar from './toggle-scrollbar';

export default function () {
	var $frame              = $('.frame');
	var $frameLeft          = $('.frame__left');
	var $burger             = $('.frame__burger');
	var $navigation         = $('.navigation');
	var $navigationLink     = $('.navigation__link');
	var transitionEnd       = transitionendEvent();
	var clicked             = false;

	// Set transition delay to each navigation link
	var transitionDelay = 0;
	$navigationLink.each(function () {
		$(this).css({
			'-webkit-transition-delay': transitionDelay + 's',
			'-moz-transition-delay': transitionDelay + 's',
			'-o-transition-delay': transitionDelay + 's',
			'transition-delay': transitionDelay + 's',
		});
		transitionDelay += 0.02;
	});

	// Show ot hide menu on the burger click
	$burger.on('click', function () {
		if (!clicked && !$burger.hasClass('burger--is-active')) {
			showMenu();
		} else if (clicked && $navigationLink.hasClass('navigation__link--is-showed')){
			hideMenu();
		}
	});

	// Show menu function
	function showMenu() {
		$frame.addClass('frame--is-active');
		$burger.addClass('burger--is-active');
		$navigation.addClass('navigation--is-active');
		// Set transitionend event to the left frame
		$frameLeft.one(transitionEnd, function () {
			// Hide main scrollbar and show navigation scrollbar
			$navigation.css('overflow-y', 'scroll');
			toggleScrollBar({ action: 'hide', fixedItems: ['.frame__header', '.frame__footer']})
			$navigationLink.addClass('navigation__link--is-showed');
		});
		// Switch flag to true
		$navigationLink.last().one(transitionEnd, function () {
			clicked = true
		});
	}
	// Hide menu function
	function hideMenu() {
		$navigationLink.removeClass('navigation__link--is-showed');
		// Set transitionend event to the last nav link
		$navigationLink.last().one(transitionEnd, function () {
			$frame.removeClass('frame--is-active');
			$burger.removeClass('burger--is-active');
			$navigation.removeClass('navigation--is-active');
			// Show main scrollbar and hide navigation scrollbar
			$navigation.css('overflow-y', 'hidden');
			toggleScrollBar({ action: 'show', fixedItems: ['.frame__header', '.frame__footer']})
			// Show scrollbar
		});
		// Switch flag to false
		$frameLeft.one(transitionEnd, function () {
			clicked = false
		});
	}
	// Hide menu on menu link click
	$navigationLink.on('click', function () {
		hideMenu();
	});
}






















// import transitionEndName from './transition-name.js';
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