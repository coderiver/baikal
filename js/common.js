head.ready(function() {

	// click
	$('body').on('click', function(){
		$('.js-search').removeClass('is-active');
	});

	$('.js-open-search').on('click', function(event) {
		$(this).parents('.js-search').addClass('is-active');
	  	event.stopPropagation();
	});
	$( ".js-search-input" ).click(function(event) {
		event.stopPropagation();
	});

});