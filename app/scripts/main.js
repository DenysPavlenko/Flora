'use strict'
// Modules
import navigation from './modules/navigation';
import blog from './modules/blog';
import map from './modules/map';
import preloader from './modules/preloader';
import scrollAnimations from './modules/scroll-animations';
import scrollSpy from './modules/scroll-spy';

// On document ready
$(function (){
	navigation();
	scrollSpy();
	blog();
	map();
});

// On window load
$(window).on('load', function () {
	preloader();
	scrollAnimations();
});