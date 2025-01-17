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
				if (window.pageYOffset > 380) {
					document.getElementById('scroll-btn').style.visibility = 'visible';
				}
			} else {
				if (window.pageYOffset === 0) {
					document.getElementById('scroll-btn').style.visibility = 'hidden';
				}
			}
			lastScrollTop = st;
			if (window.pageYOffset > 136) {
				document.getElementById('slide-h1').classList.add('animated');
				document.getElementById('slide-h1').classList.add('slideInLeft');
				document.getElementById('slide-h2').classList.add('animated');
				document.getElementById('slide-h2').classList.add('slideInRight');
				// document.getElementById('slide-h1').classList.add('delay-1s');
			} else {
				document.getElementById('slide-h1').classList.remove('animated');
				document.getElementById('slide-h1').classList.remove('slideInLeft');
				document.getElementById('slide-h2').classList.remove('animated');
				document.getElementById('slide-h2').classList.remove('slideInRight');
				// document.getElementById('slide-h1').classList.remove('delay-1s');
			}
			if (window.pageYOffset > 689) {
				document.getElementById('zoom-h1').classList.add('animated');
				document.getElementById('zoom-h1').classList.add('zoomIn');
			} else {
				document.getElementById('zoom-h1').classList.remove('animated');
				document.getElementById('zoom-h1').classList.remove('zoomIn');
			}
		},
		false
	);

	// Logica del scroll up

	let intervalId = 0;
	document.getElementById('scroll-btn').addEventListener('click', scrollToTop);

	function scrollToTop () {
		window.scrollTo(0, 0);
	}

	// Activar item elegido en el menu

	let items = document.getElementsByClassName('nav-link');
	for (i = 0; i < items.length; i++) {
		items[i].addEventListener('click', function (e) {
			for (j = 0; j < items.length; j++) {
				console.log(items[j]);
				items[j].classList.remove('active');
				console.log(items[j]);
			}
			e.target.classList.add('active');
		});
	}

	// prueba geolocalizacion
	if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition((position) => {
			let lat = position.coords.latitude;
			let lon = position.coords.longitude;
			consulta(lat, lon);
		});

		function consulta (lat, lon) {
			const API_KEY = `4d66756d2f1463d481841de10d882e5a`;
			const URL = 'https://api.openweathermap.org/data/2.5/weather';
			const URL_API = `${URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

			fetch(URL_API)
				.then((data) => {
					return data.json();
				})
				.then((weather_data) => {
					const data = weather_data;
					// console.log(transformarDatos(data));
					console.log(data);
					document.getElementById('location').innerHTML = data.name;
				});
		}
	}
};
