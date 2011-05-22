/**
 * This is a On-Screen debugging tool just use it like
 *
 * @example
 * var vConsole = new visualconsole('#debug');
 * vConsole.log("foo");
 * vConsole.log("bar", 'bazID');
 * vConsole.update('bazID', 'foobar');
 *
 * @author Ole H. Michaelis Ole[dot]Michaelis[at]gmail[dot]com
 * @see http://blog.codestars.eu/2010/onscreen-debugger/
 * @copyright (c) 2010, Ole H. Michaelis
 * @license Apache 2.0 License
 */
var visualconsole = function(target, height, width) {
	var initiated = false;

	var consoleWindow = jQuery('<div>')
							.css({'z-index':'1000', 'border':'dashed black 1px', 'padding':'0px 3px'});

	if (typeof height == 'number')
		consoleWindow.height(height);
	else
		consoleWindow.height('100%');
	if (typeof width == 'number')
		consoleWindow.width(width);
	else
		consoleWindow.width('100%');

	this.log = function(data, id) {
		if(!initiated) init(target);
		id = id || '';
		var entry = jQuery('<span>');
		entry
			.css('font-size', '11px')
			.text(makeReadable(data));
		consoleWindow.append(jQuery('<div>').attr('id', id).html(entry));
	}

	this.update = function(id, data) {
		if(jQuery('#'+id).length == 0) {
			this.log(data, id);
			return;
		}
		jQuery('#'+id).find('span').html(makeReadable(data));
	}

	this.flush = function() {
		consoleWindow.html('');
	}

	this.deleteEntry = function(id) {
		jQuery('#'+id).remove();
	}

	var init = function(target) {
		jQuery(target).append(consoleWindow);
		initiated = true;
	}

	var makeReadable = function(data) {
		if (typeof data == 'string') return data;
		return data.toString();
	}
	
}