(function($){
	$(document).on('ready', function() {

		var maxWidth = 792;
		var minWidth = 260;
		var articles = $('.article_mod');
		var articlesImg;
		var my_Row = articles.parent();
		var container = my_Row.parent();
		var proportionImg = 0.53;    //  420 /  792
		var proportionMargin = 0.0714; // 30 / 420

		if($(container).width() < maxWidth && $(container).width() > minWidth) {
			setups();
			//resizeArticles();
			resizeImg();
		}

		$( window ).resize(function() {
			if($(container).width() < maxWidth && $(container).width() > minWidth) {
				setups();
				//resizeArticles();			
				resizeImg();
			}
		});
		
		
		function setups() {
			console.log('DISPLAY BLOCK');
			$(my_Row).css({'display' : 'block'});
			articles = $('.article_mod_below_920');
			articles.css({'width' : '100%'})
			articlesImg = articles.find('.img');
			my_Row = articles.parent();
			container = my_Row.parent();
		}
	
		/*function resizeArticles() {
			if(articles.css) {
				articles.each(function(i,elem) {
					$(elem).css({
						'width' : $(container).width()*proportionImg
					});
				})
			}
		}*/
		
		function resizeImg() {
				articlesImg.each(function(i,elem) {
					var specY = '-46px';
					if($(window).width() < 450) {
						$(elem).css({
						'height' : $(elem).width()*3/4
						});
					} else {
						$(elem).css({
							'height' : '280px',
							'backgroundPosition' : ((maxWidth*proportionImg)-Number(articles.css('width').slice(0,articles.css('width').indexOf('px'))))/(-2)+'px '+ (($(elem).attr('id')=='img4') ? specY : '0px' )
						});
					}
				})
		}
			
	});
})(jQuery);