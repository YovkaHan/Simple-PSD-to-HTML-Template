/*

Место в котором подключается и объявляется вся кухня

_widths - set of named widths
_container - container of the grid (container -> j-row -> j-grid)
_classNames -  set of names of classes
_coreClassName - main class "j-grid"


addClass
checkClass
classNamesManage
*/


(function($){

	function Jgrid(classObject, letter) {

		this._articles = $('.' + classObject.name);
		this._maxWidth = classObject.w;
		this.letter = letter;
		this._articlesImgs = this._articles.find('.img');
		this._my_Row = this._articles.parent();
		this._container = this._my_Row.parent();
		this._proportionImg = { 'XL' : 0.391, 'L' : 0.53 ,'M' : 0.58, 'S' : 0.53, 'XS' : 0.45};    //  420 /  1070
		this._proportionMargin = 0.0710; // 30 / 420

		this.setups();
		this.resizeArticles();
		this.resizeImg();


		$(window).resize(function () {

			this.setups();
			this.resizeArticles();
			this.resizeImg();

		}.bind(this));
	}

	Jgrid.prototype.setups = function () {
		if(this.letter == 'XL') {
			$(this._my_Row).css({'display' : 'flex'});
		} else if(this.letter == 'L') {
			$(this._my_Row).css({'display' : 'flex'});
		} else if(this.letter == 'M') {
			$(this._my_Row).css({'display' : 'flex'});
		} else if(this.letter == 'S') {
			$(this._my_Row).css({'display' : 'block'});
			this._articles.css({'width' : '100%'});
		} else if(this.letter == 'XS') {
			$(this._my_Row).css({'display' : 'block'});
			this._articles.css({'width' : '100%'});
		}
	};

	Jgrid.prototype.resizeArticles = function () {
		this._articles.each(function (i, elem) {
			$(elem).css({
				'width': $(this._container).width() * this._proportionImg[this._letter]
			});
			if (Number($(elem).css('marginRight').slice(0, $(elem).css('marginRight').indexOf('px'))) > 0) {
				$(elem).css({
					'marginRight': Math.round($(elem).width() * this._proportionMargin)
				});
			}
			if (Number($(elem).css('marginLeft').slice(0, $(elem).css('marginLeft').indexOf('px'))) > 0) {
				$(elem).css({
					'marginLeft': Math.round($(elem).width() * this._proportionMargin)
				});
			}
		}.bind(this));
	};

	Jgrid.prototype.resizeImg = function() {
		this._articlesImgs.each(function (i, elem) {
			var specY = '-46px';
			if($(window).width() < 450) {
				$(elem).css({
					'height' : $(elem).width()*3/4
				});
			} else {
				var calcWidth = (this._maxWidth*this._proportionImg)-Number(this._articles.css('width').slice(0,this._articles.css('width').indexOf('px')));
				$(elem).css({
					'height' : '280px',
					'backgroundPosition' : calcWidth / (-2)+'px '+ (($(elem).attr('id')=='img4') ? specY : '0px' )
				});
			}
			}.bind(this))
	};
	
	function JgridManage() {
		this._container = $('.j-grid').parent().parent();   // container of the grid (container -> j-row -> j-grid)
		this._classNames = {  									// set of names of classes
			'XL' : {name: 'j-grid-xl', w: 1140},
			'L' : {name: 'j-grid-l', w: 960},
			'M' : {name: 'j-grid-m', w: 720},
			'S' : {name: 'j-grid-s', w: 540},
			'XS' : {name: 'j-grid-xs', w: 250},
		};
		this._mainClass = 'j-grid';
		this.letter = 'L';
		
		$(document).on('ready', function() {
			this.letter = this.manage();
			var grid = new Jgrid(this._classNames[this.letter], this.letter);			// first load//
			$( window ).resize(function() {
				var tLetter = this.manage();
				if(this.letter != tLetter) {
					grid = null;
					grid = new Jgrid(this._classNames[tLetter], tLetter);  			// resize load//
					this.letter = tLetter;
				}
			}.bind(this));
		}.bind(this));
	}
	
	JgridManage.prototype.addClass = function(tag){
		this.removeAllClasses();
		$('.'+this._mainClass).addClass(this._classNames[tag].name);
	}
	
	JgridManage.prototype.removeAllClasses = function(){
		for(var cl in this._classNames) {
			if($('.'+this._mainClass).hasClass(this._classNames[cl].name)) {
				$('.'+this._mainClass).removeClass(this._classNames[cl].name);
			}
		}
	}
	
	JgridManage.prototype.manage = function(){
		var cWidth = $(this._container).width();
		var letter = 'L';
		if(cWidth >= this._classNames['XL'].w) {
			this.addClass('XL');
			//this.removeAllClasses();
		} else if(cWidth >= this._classNames['L'].w) {
			this.addClass('L');
			letter = 'L';
		} else if(cWidth >= this._classNames['M'].w) {
			this.addClass('M');
			letter = 'M';
		} else if(cWidth >= this._classNames['S'].w) {
			this.addClass('S');
			letter = 'S';
		} else if(cWidth < this._classNames['S'].w) {
			//this.addClass('XS');
		}
		return letter;
	}
	
	var grid = new JgridManage();
	
})(jQuery);