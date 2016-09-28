(function($){
	$(document).on('ready', function() {
		var widths = [1070, 792, 260];
		
		var container = $('.article_mod').parent().parent();
		
		checkWidth();
		
		$( window ).resize(function() {
			checkWidth();
		});
		
		
		function checkWidth() {
			($(container).width() < widths[0]) ? 
												($(container).width() < widths[1]) ?
																					addClassA_B_920() : addClassA_920() : removeAllClass();
		}
		
		function addClassA_920() {
			$('.article_mod').addClass('article_mod_to_920');
			if($('.article_mod').hasClass('article_mod_below_920')) {
				$('.article_mod').removeClass('article_mod_below_920');
			}
		}
		
		function addClassA_B_920() {
			$('.article_mod').addClass('article_mod_below_920');
			if($('.article_mod').hasClass('article_mod_to_920')) {
				$('.article_mod').removeClass('article_mod_to_920');
			}
		}
		
		function removeAllClass() {
			if($('.article_mod').hasClass('article_mod_to_920')) {
				$('.article_mod').removeClass('article_mod_to_920');
			} else if($('.article_mod').hasClass('article_mod_below_920')) {
				$('.article_mod').removeClass('article_mod_below_920');
			}
		}
			
	});
})(jQuery);