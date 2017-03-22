(function($){
	
	$(document).on('ready', function() {

		var maxWidth = 1070;
		var minWidth = 792;
		var articles = $('.j-grid');
		var articlesImg;
		var my_Row = articles.parent();
		var container = my_Row.parent();
		var proportionImg = 0.391;    //  420 /  1070
		var	proportionMargin = 0.0710; // 30 / 420

		if($(container).width() < maxWidth && $(container).width() > minWidth) {
			setups();
			resizeArticles();
			resizeImg();
		}

		$( window ).resize(function() {
			var articles = $('.j-grid');
			var articlesImg;
			var my_Row = articles.parent();
			var container = my_Row.parent();
			
			if($(container).width() < maxWidth && $(container).width() > minWidth) {
				setups();
				resizeArticles();			
				resizeImg();
			}
		});
		
				
		function setups() {
			$(my_Row).css({'display' : 'flex'});
			articles = $('.j-grid-m');
			articlesImg = articles.find('.img');
			my_Row = articles.parent();
			container = my_Row.parent();
		}
		
	
		function resizeArticles() {
				articles.each(function(i,elem) {
					$(elem).css({
						'width' : $(container).width()*proportionImg
					});
					if(Number($(elem).css('marginRight').slice(0, $(elem).css('marginRight').indexOf('px'))) > 0) {
						$(elem).css({
							'marginRight' : Math.round($(elem).width()*proportionMargin)
						});
					}
					if(Number($(elem).css('marginLeft').slice(0, $(elem).css('marginLeft').indexOf('px'))) > 0) {
						$(elem).css({
							'marginLeft' : Math.round($(elem).width()*proportionMargin)
						});
					}
				})
		}
		
		function resizeImg() {
				articlesImg.each(function(i,elem) {
					var specY = '-46px';
					$(elem).css({
						'backgroundPosition' : ((maxWidth*proportionImg)-Number(articles.css('width').slice(0,articles.css('width').indexOf('px'))))/(-2)+'px '+ (($(elem).attr('id')=='img4') ? specY : '0px' )
					});				
				})
		}
			
	});
})(jQuery);