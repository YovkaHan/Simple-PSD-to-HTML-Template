(function($){
	require('script!../../node_modules/jquery-placeholder/jquery.placeholder.js');
	$(document).on('ready', function() {
		if($('html').hasClass('no-placeholder')) {
			$('.sign-up-content input').placeholder();
		}
	})
})(jQuery);