var maxWidth = 1199;
var minWidth = 769;
var lis = [0.083,0.083,0.067,0.058];

function playWithWidth(windowWith, marginLeft , index){
	var multipl = (windowWith <= 1100 ) ? 0.75 : (windowWith <= 900 ) ? 0.5 : 1 ;
	return (windowWith * lis[index] * multipl);
};

function resizeMargin() {
	$('.navbar-nav').children().map(function(i, elem) {
			var mL = Number($(elem).css('marginLeft').slice(0, $(elem).css('marginLeft').indexOf('px')));
			var wWidth = $(document).width();
			$(elem).css({
				'marginLeft' : Number(playWithWidth(wWidth, mL, i))+'px'
			});
		});
		window.pastWW = $(document).width();
}

$(document).on('ready', function() {
	window.i = 0;
	window.pastWW = $(document).width();
	resizeMargin();
	console.log(window.pastWW);
	$( window ).resize(function() {
		if($(document).width() < maxWidth && $(document).width() > minWidth)
		resizeMargin();
	});
});
