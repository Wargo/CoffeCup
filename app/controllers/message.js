var args = arguments[0] || {};

$.text.text = args.message;

if (args.me) {
	$.view.backgroundColor = '#50BFFFEF';
	$.view.right = '10dp';
	$.view.left = '80dp';
} else {
	$.view.backgroundColor = '#507B89A6';
	$.view.right = '80dp';
	$.view.left = '10dp';
}