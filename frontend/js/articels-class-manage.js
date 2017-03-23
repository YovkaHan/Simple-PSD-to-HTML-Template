/*

Место в котором подключается и объявляется вся кухня

	**ВЕРСИЯ ПОД ПРОЕКТ
*/


(function($){

	/* Jgrid - класс обработки css-класса "j-grid". Обработка включает в себя отслеживание и манипуляция:
	* 	margin-left всего блока
	*	margin-right всего блока
	*	display родительского блока "myRow"
	*	width всего блока
	*
	*  */
	function Jgrid(classObject, letter) {

		this._articles = $('.' + classObject.name);
		this._maxWidth = classObject.w;
		this.letter = letter;
		this._articlesImgs = this._articles.find('.img');    //  Все картинки в блоке(-ках)
		this._my_Row = this._articles.parent();
		this._container = this._my_Row.parent();			 //  Вснешний контейнер
		//this._proportionImg = { 'XL' : 0.391, 'L' : 0.53 ,'M' : 0.58, 'S' : 0.53, 'XS' : 0.45};    //  420 /  1070
		this._proportionMargin = 0.0710; // 30 / 420

		this.handler = function () {
			this.setups();
			this.resizeArticles();
			this.resizeImg();

		}.bind(this);

		this.handler.call(this);

		$(window).bind('resize', this.handler);
	}
	// Назван по причине освобождения от выполнения эвентов
	Jgrid.prototype.destruct = function () {
		$(window).unbind('resize', this.handler);
	}

	// Общие установки
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

	// Изменение отступов основного блока от родительского
	Jgrid.prototype.resizeArticles = function () {
		this._articles.each(function (i, elem) {
			if (this.letter == 'S' || this.letter == 'XS'){
				$(elem).css({
					'marginRight': '0px',
					'marginLeft': '0px'
				});
			} else {
				var magic = 30;
				if (Number($(elem).css('marginRight').slice(0, $(elem).css('marginRight').indexOf('px'))) > 0) {
					$(elem).css({
						'marginRight': Math.round($(elem).width() * this._proportionMargin)
					});
				} else {
					$(elem).css({
						'marginRight': magic+'px'
					});
				}
				if (Number($(elem).css('marginLeft').slice(0, $(elem).css('marginLeft').indexOf('px'))) > 0) {
					$(elem).css({
						'marginLeft': Math.round($(elem).width() * this._proportionMargin)
					});
				} else {
					$(elem).css({
						'marginLeft': magic+'px'
					});
				}
			}
		}.bind(this));
	};

	// Изменение свойств картинок в блоке
	Jgrid.prototype.resizeImg = function() {
		this._articlesImgs.each(function (i, elem) {
			if($(window).width() < 450) {
				$(elem).css({
					'height' : $(elem).width()*3/4
				});
			} else {
				if(this.letter == 'L' || this.letter == 'XL' || this.letter == 'M') {
					$(elem).css({
						'backgroundPosition' : 'center',
						'backgroundSize' : 'auto'
					});
				} else if( this.letter == 'S') {
					$(elem).css({
						'backgroundPosition' : 'center',
						'backgroundSize' : '90%'
					});
				}

			}
			}.bind(this))
	};

	/* Класс контроля имен */
	function JgridManage() {
		this._container = $('.j-grid').parent().parent();   // container of the grid (container -> j-row -> j-grid)
		this._classNames = {  									// set of names of classes
			'XL' : {name: 'j-grid-xl', w: 1140},
			'L' : {name: 'j-grid-l', w: 960},
			'M' : {name: 'j-grid-m', w: 720},
			'S' : {name: 'j-grid-s', w: 540},
			'XS' : {name: 'j-grid-xs', w: 540},
		};
		this._mainClass = 'j-grid';
		this.letter = 'L';
		
		$(document).on('ready', function() {
			this.letter = this.manage();
			var grid = new Jgrid(this._classNames[this.letter], this.letter);			// first load//
			$( window ).resize(function() {
				var tLetter = this.manage();
				if(this.letter != tLetter) {
					grid.destruct();
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

	/*Манипуляция именами классов при определенных условиях*/
	JgridManage.prototype.manage = function(){
		var cWidth = $(this._container).width();
		var outLetter = 'L';
		if(cWidth >= this._classNames['XL'].w) {
			this.addClass('XL');
		} else if(cWidth >= this._classNames['L'].w) {
			this.addClass('L');
			outLetter = 'L';
		} else if(cWidth >= this._classNames['M'].w) {
			this.addClass('M');
			outLetter = 'M';
		} else if(cWidth >= this._classNames['S'].w) {
			this.addClass('S');
			outLetter = 'S';
		} else if(cWidth < this._classNames['XS'].w) {
			this.addClass('XS');
			outLetter = 'XS';
		}
		return outLetter;
	}

	/* Запуск всей логики*/
	var grid = new JgridManage();
	
})(jQuery);