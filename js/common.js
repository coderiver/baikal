head.ready(function() {

	// click
	$('body').on('click', function(){
		$('.js-search').removeClass('is-active');
	});

	// show search
	$('.js-open-search').on('click', function(event) {
		$(this).parents('.js-search').addClass('is-active');
	  	event.stopPropagation();
	});
	$( ".js-search-input" ).click(function(event) {
		event.stopPropagation();
	});

	// fixed header
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
			header = $('.header');

		if (scroll < 1) {
			header.removeClass('is-fixed');
		} else {
			header.addClass('is-fixed');
		}
	});

	// slider
	$('.js-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		fade: true,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true
	});
	function sliderNav(){
		$('.js-slider').on('init', function(event, slick){
			$(this).find('.slick-dots button').text(slideIndex);
		});
		$('.js-slider .slick-dots').wrap("<div class='slider__nav'></div>");
		$('.slider__nav').prepend("<span class='slider__nav-text'>7 преимуществ процессоров Baikal:</span>")
	}
	sliderNav();

	$('.js-gall').slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		arrows: false,
		dots: true,
		speed: 600,
		autoplay: true,
		autoplaySpeed: 3000
	});

	// tab
	function tab() {
		$(".js-tab").each(function(){
			var tabLink = $(this).find("a");
				tabLinkAc = $(this).find("li.is-active a");
				tabItem = $(this).find("li");
				tabItemFirst = $(this).find("li:first");
				tabCont = $(this).parents(".js-tab-group").find(".js-tab-cont");
				tabContFirst = $(this).parents(".js-tab-group").find(".js-tab-cont:first");
			if (!tabItem.hasClass('is-active')) {
				var index = tabLinkAc.attr("href");
				tabItemFirst.addClass('is-active');
				tabLinkAc.parents(".js-tab-group").find('.' + index).fadeIn();
			}else {
				var index = tabLinkAc.attr("href");
				tabLinkAc.parents(".js-tab-group").find('.'+index+'').fadeIn();
			}
			tabLink.on("click", function() {
				var index = $(this).attr("href");
				tabItem.removeClass("is-active");
				$(this).parent().addClass("is-active");
				tabCont.hide();
				$(this).parents(".js-tab-group").find("."+index).fadeIn();
				return false;
			});
		});
	}
	tab();

	// video
	$('.js-picture').click(function(){
		$('.js-video').html($(this).data('video'));
	});


});