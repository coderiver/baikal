head.ready(function() {

	// touchstart
	var agent = navigator.userAgent,
		event = (agent.match(/iPad/i)) ? "touchstart" : "click";

	// click
	$('body').on('click', function() {
		$('.js-search').removeClass('is-active');
		$('.js-overlay, .js-date-inf, .js-date-arr').fadeOut();
		$('.js-menu-block').removeClass('is-active');

	});
	
	$('body').on('click, touchstart', function() {
		$('.js-menu').removeClass('is-active');
	});

	$("body").on("click, touchstart", ".js-date-inf, .js-open-menu, .js-menu", function(event){
		event.stopPropagation();
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

		var scroll = $(window).scrollTop(),
			header = $('.header'),
			height = header.height();

		if (scroll < height) {
			header.removeClass('is-fixed');
		} else {
			header.addClass('is-fixed');
		}
	});

	$('.js-menu-link').on('click', function () {
		$('.js-menu-block').removeClass('is-active');
		$(this).parent().find('.js-menu-block').toggleClass('is-active');
		return false;
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

	// gallery
	$('.js-gall').slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		arrows: false,
		dots: true,
		speed: 600,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1219,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 380,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// partners
	$('.js-partners-list').slick({
		slidesToShow: 8,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		cssEase: 'linear',
		autoplay: true,
		speed: 600,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 1219,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}
		]
	});

	$('.js-slider-workers').each(function() {
		$(this).slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			cssEase: 'linear',
			autoplay: true,
			speed: 600,
			autoplaySpeed: 2000,
			responsive: [
				{
					breakpoint: 1219,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 380,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
	});

	// tab
	function tab() {
		$(".js-tab").each(function(){

			var parent = $(this).parents(".js-tab-group"),
				tabLink = $(this).find("a"),
				tabLinkAc = $(this).find("li.is-active a"),
				tabItem = $(this).find("li"),
				tabItemFirst = $(this).find("li:first"),
				tabCont = parent.find(".js-tab-cont"),
				tabContFirst = parent.find(".js-tab-cont:first");

			if (!tabItem.hasClass('is-active')) {
				var index = tabLinkAc.attr("href");
				tabItemFirst.addClass('is-active');
				tabContFirst.show();
			} else {
				var index = tabLinkAc.attr("href");
				tabLinkAc.parents(".js-tab-group").find("."+index).show();
			}

			if (parent.hasClass('is-catalog')) {
				tabItemFirst.removeClass('is-active');
				tabContFirst.hide();
			}

			tabLink.on("click", function() {

				var linkThis = $(this),
					index = linkThis.attr('href'),
					linkParent = linkThis.parent(),
					products = parent.find('.js-product');

				if (linkParent.hasClass('is-active')) {
					tabItem.removeClass('is-active');
					tabCont.hide();
					// catalog
					if (parent.hasClass('is-catalog')) {
						products.show();
					}
				}
				else {
					tabItem.removeClass('is-active');
					tabCont.hide();
					linkParent.addClass('is-active');
					parent.find('.' + index).show();
					// catalog
					if (parent.hasClass('is-catalog')) {
						products.hide();
					}
				}
				return false;
			});
			if ($(window).width() < 460) {
				tabLink.on('click', function(){
					var page = $(this).attr("href");
					$('html, body').animate({
						scrollTop: $('.' + page).offset().top - 80
					}, 600);
					return false;
				});
			}
		});
	}
	tab();

	// video
	$('.js-picture').click(function(){
		$('.js-video').html($(this).data('video'));
	});

	// check all
	$('.js-check-all').on('change', function() {
		var input = $(this).parents('.js-form').find('input[type="radio"], input[type="checkbox"]');
		if ($(this).is(':checked')) {
			input.each(function(){
				this.checked = true;
			});
		}
		else {
			input.prop('checked', false);
		}
	});
	$('.js-input-checkbox, .js-check-all').on('change', function() {
		var length = $('.js-input-checkbox:checked').length,
			checkbox = $('.js-input-checkbox, .js-check-all'),
			input = $('.js-input-checkbox'),
			weight = $('.js-input-checkbox:checked').parents('.js-checkbox').find('.js-weight'),
			btn = $(this).parents('.js-form').find('.btn'),
			weightLength = weight.text(),
			value = $('.js-check-value'),
			sum = 0;

		weight.each(function () {
			var val = +$(this).text();
			sum += val;
			$('.js-check-weight').text(sum / 1000);
			return sum;
		});

		if (checkbox.is(':checked')) {
			value.text(length);
			btn.show();
		}
		else {
			value.text('');
			btn.hide();
		}
	});

	// form disabled
	$('.js-form-down').each(function(){
		var errorText = $(this).find(".error-text");

		function formDisabled() {
			var form = $('.js-form');
			form.each(function(){
				var input = $(this).find('input[type="radio"], input[type="checkbox"]');
				if ($(this).hasClass('is-disabled')) {
					input.prop('disabled', true);
				}
				else {
					input.prop('disabled', false);
				}
			});
		}
		formDisabled();

		$(this).validate({
			rules: {
				name: "required",
				email: "required",
				phone: {
					required: true,
					minlength: 7
				}
			},
			submitHandler: function(form) {
				$('.js-form').removeClass('is-disabled');
				errorText.hide();
				errorText.text('Спасибо! Ваше сообщение успешно отправлено.');
				errorText.fadeIn().addClass('is-submit');
				setTimeout(function(){
					$('.js-form-down').hide();
					errorText.removeClass('is-submit');
				}, 1500);
				formDisabled();
				return false;
			 },
			invalidHandler: function(event, validator) {
				var errors = validator.numberOfInvalids();
				var errorText = $(this).find(".error-text");
				if (errors) {
					errorText.fadeIn();
				} 
				else {
					errorText.hide();
				}
			},
		});
	});

	// form
	$('.js-form').each(function(){
		var errorText = $(this).find(".error-text");

		$(this).validate({
			rules: {
				name: "required",
				email: "required",
				city_popup: "required",
				message: "required",
				questions: "required",
				phone: {
					required: true,
					minlength: 7
				}
			},
			submitHandler: function(form) {
				errorText.text('Спасибо! Ваше сообщение успешно отправлено.');
				errorText.removeClass('is-submit');
				errorText.fadeIn().addClass('is-submit');
				setTimeout(function(){
					errorText.fadeOut();
					form.submit();
				}, 1000);
			 },
			invalidHandler: function(event, validator) {
				var errors = validator.numberOfInvalids(),
					errorText = $(this).find(".error-text");
				if (errors) {
					errorText.fadeIn();
				} 
				else {
					errorText.hide();
				}
			},
		});
	});
	$('input[name="phone"]').on('keyup', function(){
		var value = $(this).val();
		var re = /[^0-9,+_ ""()-]/;
		if (re.test(value)) {
			value = value.replace(re, '');
			$(this).val(value);
		}
	});

	// datepicker
	var eventDates = [[2015,06,06], [2015,06,28]];
	$(".datepicker").datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		dayNamesMin: ['S','M','T','W','T','F','S'],
		inline: true,
		firstDay: 1,
		minDate: 0,
		dateFormat: "dd-mm-yy",
		beforeShowDay: setDays,
		onSelect: function(date) {
			var thisEl = $(this);
			var thisWidth = $(this).width();
			setTimeout(function () {
				var el = thisEl.find('.ui-state-active');
				if (el.parent().hasClass('js-event')) {
					var posTop = el.position().top,
						posLeft = el.position().left,
						block = $('#' + date),
						arr = $('.js-date-arr'),
						elHeight = block.height();
					arr.hide();
					arr.fadeIn();
					arr.css({'top':posTop - 5, 'left':posLeft + 4});
					block.css({'top':posTop, 'margin-top': - elHeight - 39});
					$('.js-date-inf').hide();
					$('#' + date).fadeIn();
				}
			}, 1);
		}
	});
	
	function setDays(date) {
		for (i = 0; i < eventDates.length; i++) {
			if (date.getFullYear() == eventDates[i][0]
				&& date.getMonth() == eventDates[i][1] - 1
				&& date.getDate() == eventDates[i][2]) {
				return [true, 'event js-event', eventDates[i][3]];
			}
		}
		return [true, ''];
	};

	// select
	$('.js-select').chosen({disable_search_threshold: 10});
	
	// select-mob
	function selectMob() {
		$('.js-select').each(function() {
			$(this).on('change', function() {
				var val = $(this).find('option:selected').text();
				$(this).parent().find('.chosen-single span').text(val);
			});
		});
	}
	selectMob();
	// table method
	$('.js-method').on('click', function() {
		if ($(this).hasClass('is-choose')) {
			$(this).removeClass('is-choose');
		}
		else {
			$(this).addClass('is-choose');
		}
		return false;
	});

	// popup
	$('.js-popup').on('click', function() {
		$(this).fadeOut();
		$('body').css({'overflow':'auto'});
		if ($(window).width() < 1024) {
			$('body').css({'position':'initial'});
		}
	});
	$('.js-popup-close').on('click', function() {
		$('.js-popup').trigger('click');
	});
	$(".js-popup-in").on("click", function(event){
		event.stopPropagation();
	});

	// popup open
	$('.js-open-popup').on('click', function() {
		$('.js-popup').fadeIn();
		$('body').css({'overflow':'hidden'});
		if ($(window).width() < 1024) {
			$('body').css({'position':'fixed'});
		}
	});

	// fancybox
	$('.js-fancybox').fancybox();

	// open menu
	$('.js-open-menu').on('click', function() {
		$('.js-menu').toggleClass('is-active');
	});

	// map
	$('#map').each(function () {
		function initialize() {
			var mapOptions = {
				center: { lat: -34.397, lng: 150.644},
				zoom: 12,
		  		disableDefaultUI: true
			};
			var map = new google.maps.Map(document.getElementById('map'),
			mapOptions);
		}
		google.maps.event.addDomListener(window, 'load', initialize);
	});

	// accord
	$('.js-accord-title').on('click', function() {
		if ($(this).parents('.js-accord').hasClass('is-active')) {
			$('.js-accord').removeClass('is-active');
		} else {
			$('.js-accord').removeClass('is-active');
			$(this).parents('.js-accord').addClass('is-active');
		}
		return false;
	});

	// CustomScrollbar
	$.mCustomScrollbar.defaults.scrollButtons.enable = false;
	$(".js-custom-scroll").mCustomScrollbar({
		axis:"x",
		advanced:{ autoExpandHorizontalScroll:true,
			scrollEasing: "linear"
		},
		theme:"rounded-dark",
		mouseWheel:{ preventDefault: true }
	});
	
	function widthHorizontalBar() {
		var contWidth = $('.container').width();

		if ($('.compare__in').hasClass('js-custom-scroll')) {
			$('.mCSB_draggerContainer').width(contWidth - 80);
		}
	}
	widthHorizontalBar();

	$(window).resize(function () {
		var contWidth = $('.container').width();
		if ($('.compare__in').hasClass('js-custom-scroll')) {
			$('.mCSB_draggerContainer').width(contWidth - 80);
		}
	});

	// input file
	function getName (str){
		if (str.lastIndexOf('\\')){
			var i = str.lastIndexOf('\\')+1;
		}
		else{
			var i = str.lastIndexOf('/')+1;
		}						
		var filename = str.slice(i);			
		var uploaded = document.getElementById("js-input-lab");
		uploaded.innerHTML = filename;
	};

	$('.js-input-file').on('change', function() {
		getName($(this).val());
	});

});

