var args = arguments[0] || {};

var date = new Date();

var month = parseInt(date.getMonth()) + 1 <= 9 ? '0' + parseInt(parseInt(date.getMonth()) + 1) : parseInt(date.getMonth()) + 1;
var mins = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes();
var seconds = date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds();
var hours = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours();

var today = date.getDate() + '-' + month + '-' + date.getFullYear() + ' ' + hours + ':' + mins + ':' + seconds;

$.text.text = args.content;
$.date.text = args.date || today;

if (args.me) {
	$.view.backgroundColor = '#50BFFFEF';
	$.view.right = '10dp';
	$.view.left = '80dp';
} else {
	$.view.backgroundColor = '#507B89A6';
	$.view.right = '80dp';
	$.view.left = '10dp';
}