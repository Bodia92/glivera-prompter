var $body,
	windowHeight,
	windowWidth,
	degree = 0.0174532925,
	mediaPoint1 = 1024,
	mediaPoint2 = 768,
	mediaPoint3 = 480,
	mediaPoint4 = 320,
	productionStatus = false,
	$mobileSlider;

$(document).ready(function ($) {
	$body = $('body');

	if (!productionStatus) {
		//developer funcitons
		pageWidget(['index']);
		getAllClasses('html', '.elements_list');
	}

	$('.product_preview_slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		asNavFor: '.product_preview_nav'
	});

	$('.product_preview_nav').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
	});

	$('.product_preview_nav_item').on('click', function() {
		$('.product_preview_slider').slick('slickGoTo', $(this).data('slick-index'))
	})

	$().fancybox({
		selector : '.product_preview_slider .slick-slide:not(.slick-cloned)',
		backFocus : false,
		afterShow : function( instance, current ) {
			current.opts.$orig.closest(".slick-initialized").slick('slickGoTo', parseInt(current.index), true);
		}
	});

	$mobileSlider = $('.mobileSlider')
});

$(window).on('load', function () {
	updateSizes();
	loadFunc();
});

$(window).on('resize', function () {
	resizeFunc();
});

$(window).on('scroll', function () {
	scrollFunc();
});

function loadFunc() {
	calcViewportHeight();
}

function resizeFunc() {
	updateSizes();

	calcViewportHeight();
}

function scrollFunc() {}

function calcViewportHeight() {
	if (isMobile.apple.phone || isMobile.android.phone || isMobile.seven_inch) {
		var vh = window.innerHeight * 0.01;
		// var vh2 = document.documentElement.clientHeight * 0.01;

		document.documentElement.style.setProperty('--vh', vh + 'px');
	}
}

function updateSizes() {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

	if (windowWidth < mediaPoint1) {
		if (!$mobileSlider.hasClass('slick-slider')) {
			initMomileSliderFunc();
		}
	} else {
		if ($mobileSlider.hasClass('slick-initialized')) {
			$mobileSlider.slick("unslick");
		}
	}
}

//--------------Slider---------------------
function initMomileSliderFunc() {
	$mobileSlider.slick({
		prevArrow: $('.slider_prev'),
		nextArrow: $('.slider_next'),
		infinite: true,
		variableWidth: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		autoplay: false,
	});
}
//------------------------------------------

if ('objectFit' in document.documentElement.style === false) {
	document.addEventListener('DOMContentLoaded', function () {
		Array.prototype.forEach.call(
			document.querySelectorAll('img[data-object-fit]'),
			function (image) {
				(image.runtimeStyle || image.style).background =
					'url("' +
					image.src +
					'") no-repeat 50%/' +
					(image.currentStyle
						? image.currentStyle['object-fit']
						: image.getAttribute('data-object-fit'));

				image.src =
					"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" +
					image.width +
					"' height='" +
					image.height +
					"'%3E%3C/svg%3E";
			}
		);
	});
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

var styles = ['color: #fff', 'background: #cf8e1f'].join(';');
var message = 'Developed by Glivera-team https://glivera-team.com/';

console.info('%c%s', styles, message);
