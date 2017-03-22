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
	
	function JgridManage() {
		this._container = $('.j-grid').parent().parent();   // container of the grid (container -> j-row -> j-grid)
		this._classNames = {  									// set of names of classes
			'XL' : {name: 'j-grid-xl', w: 1140},
			'L' : {name: 'j-grid-l', w: 960},
			'M' : {name: 'j-grid-m', w: 720},
			'S' : {name: 'j-grid-s', w: 540},
			'XS' : {name: 'j-grid-s', w: 250},
		}
		this._mainClass = 'j-grid';
		
		$(document).on('ready', function() {
			this.manage();									// first load
			$( window ).resize(function() {
				this.manage();								// resize load
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
		
		if(cWidth >= this._classNames['XL'].w) {
			//this.addClass('XL');
			this.removeAllClasses();
		} else if(cWidth >= this._classNames['L'].w) {
			this.addClass('L');
		} else if(cWidth >= this._classNames['M'].w) {
			this.addClass('M');
		} else if(cWidth >= this._classNames['S'].w) {
			this.addClass('S');
		} else if(cWidth < this._classNames['S'].w) {
			//this.addClass('XS');
		}
	}
	
	var grid = new JgridManage();
	
})(jQuery);