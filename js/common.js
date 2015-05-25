head.ready(function() {

	// click
	$('body').on('click', function(){
		$('.js-search, .js-menu').removeClass('is-active');
		$('.js-overlay, .js-date-inf, .js-date-arr').fadeOut();
		$('.js-menu-block').removeClass('is-active');
	});

	$("body").on("click", ".js-date-inf, .js-open-menu", function(event){
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
		$('.js-menu-block').toggleClass('is-active');
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
				tabContFirst.fadeIn();
			} else {
				var index = tabLinkAc.attr("href");
				tabLinkAc.parents(".js-tab-group").find("."+index).fadeIn();
			}

			if (parent.hasClass('is-catalog')) {
				tabItemFirst.removeClass('is-active');
				tabContFirst.hide();
				tabLink.on("click", function() {
					parent.find('.js-product').fadeOut();
				});
			}

			tabLink.on("click", function() {
				var index = $(this).attr("href");
				tabItem.removeClass("is-active");
				$(this).parent().addClass("is-active");
				tabCont.hide();
				parent.find("."+index).fadeIn();
				return false;
			});
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
		if ($(this).is(':checked'))
			input.each(function(){
			    this.checked = true;
			});
		else
			input.removeAttr('checked');
	});

	// form disabled
	$('.js-form-down').each(function(){
		var errorText = $(this).find(".error-text");

		function formDisabled() {
			var form = $('.js-form');
			form.each(function(){
				var input = $(this).find('input[type="radio"], input[type="checkbox"]');
				if ($(this).hasClass('is-disabled')) {
					input.attr('disabled', 'disabled');
				}
				else {
					input.removeAttr('disabled');
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
	var eventDates = {};
		eventDates[ new Date('05-27-2015')] = new Date('05-27-2015');
		eventDates[ new Date('05-28-2015')] = new Date('05-28-2015');
	$(".datepicker").datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		dayNamesMin: ['S','M','T','W','T','F','S'],
		inline: true,
		firstDay: 1,
		minDate: 0,
		dateFormat: "dd-mm-yy",
		beforeShowDay: function(date){
			var highlight = eventDates[date];
			dateFormat: "dd-mm-yy"
			if (highlight) {
				return [true, "event js-event", "highlight"];
			} else {
				return [true, '', ''];
			}
		},
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
					arr.css({'top':posTop - 5, 'left':posLeft});
					block.css({'top':posTop, 'margin-top': - elHeight - 29});
					$('.js-date-inf').hide();
					$('#' + date).fadeIn();
				}
			}, 1);
		}
	});

	// select
	$('.js-select').chosen({disable_search_threshold: 10});

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

	// jScrollPane
	$('.js-scroll-pane').each(function(){

		$(this).jScrollPane({
			showArrows: true,
			horizontalDragMinWidth: 62,
			horizontalDragMaxWidth: 62,
			horizontalGutter: 30
		});
		var api = $(this).data('jsp');
		var throttleTimeout;
		$(window).bind('resize', function() {
			if (!throttleTimeout) {
				throttleTimeout = setTimeout( function() {
					api.reinitialise();
					widthHorizontalBar();
					throttleTimeout = null;
				}, 50 );
			}
		});

		function widthHorizontalBar() {
			var contWidth = $('.container').width();
			if ($('body').find('.container' && '.js-scroll-pane')) {
				$('.jspHorizontalBar').width(contWidth);
			}
		}
		widthHorizontalBar();

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

});