// jQuery is required to run this code
$(document).ready(function () {
	scaleVideoContainer();

	initBannerVideoSize('.video-container .poster img');
	initBannerVideoSize('.video-container .filter');
	initBannerVideoSize('.video-container video');

	$(window).on('resize', function () {
		scaleVideoContainer();
		scaleBannerVideoSize('.video-container .poster img');
		scaleBannerVideoSize('.video-container .filter');
		scaleBannerVideoSize('.video-container video');
	});
});

function scaleVideoContainer () {
	var height = $(window).height() + 5;
	var unitHeight = parseInt(height) + 'px';
	$('.homepage-hero-module').css('height', unitHeight);
}

function initBannerVideoSize (element) {
	$(element).each(function () {
		$(this).data('height', $(this).height());
		$(this).data('width', $(this).width());
	});

	scaleBannerVideoSize(element);
}

function scaleBannerVideoSize (element) {
	var windowWidth = $(window).width(),
		windowHeight = $(window).height() + 5,
		videoWidth,
		videoHeight;

	// console.log(windowHeight);

	$(element).each(function () {
		var videoAspectRatio = $(this).data('height') / $(this).data('width');

		$(this).width(windowWidth);

		if (windowWidth < 1000) {
			videoHeight = windowHeight;
			videoWidth = videoHeight / videoAspectRatio;
			$(this).css({
				'margin-top': 0,
				'margin-left': -(videoWidth - windowWidth) / 2 + 'px'
			});

			$(this).width(videoWidth).height(videoHeight);
		}

		$('.homepage-hero-module .video-container video').addClass(
			'fadeIn animated'
		);
	});
}

window.onload = function () {
	// Cerrar menu hamburguesa despues del click
	let links = document.getElementsByClassName('nav-link');
	// console.log(links);
	for (i = 0; i < links.length; i++) {
		links[i].addEventListener('click', collapse);
	}

	function collapse () {
		$('.navbar-collapse').collapse('hide');
	}

	// Mostrando boton scroll up

	var lastScrollTop = 0;

	window.addEventListener(
		'scroll',
		function () {
			var st = window.pageYOffset || document.documentElement.scrollTop;
			if (st > lastScrollTop) {
				if (window.pageYOffset > 480) {
					document.getElementById('scroll-btn').style.visibility = 'visible';
				}
			} else {
				if (window.pageYOffset === 0) {
					document.getElementById('scroll-btn').style.visibility = 'hidden';
				}
			}
			lastScrollTop = st;
		},
		false
	);

	// Logica del scroll up

	let intervalId = 0;
	document.getElementById('scroll-btn').addEventListener('click', scrollToTop);

	function scrollToTop () {
		window.scrollTo(0, 0);
	}
};
