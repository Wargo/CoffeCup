var args = arguments[0] || {};

$.avatar.image = args.img_p;
$.name.text = args.name;
$.charge.text = args.charge;
$.email.text = args.email;
$.mobile.text = args.mobile;
$.birthday.text = args.birthday;
$.icomefrom.text = args.icomefrom;
$.talkmeabout.text = args.talkmeabout;

$.l_email.text = L('email');
$.l_mobile.text = L('mobile');
$.l_birthday.text = L('birthday');
$.l_talkmeabout.text = L('talkmeabout');
$.l_icomefrom.text = L('icomefrom');

$.user.on('swipe', function(e) {
	if (e.direction == 'right') {
		$.user.close({left:'320dp'});
	}
});

var y = 0;

$.scrollview.on('dragstart', function(e) {
	y = e.source.contentOffset.y;
});

$.scrollview.on('dragend', function(e) {
	if (e.source.contentOffset.y < y) {
		$.scrollview.scrollTo(0,0);
		$.messageSenderArea.animate({opacity:1});
	} else {
		$.scrollview.scrollToBottom();
		$.messageSenderArea.animate({opacity:0});
	}
});

$.send.title = L('send');

$.messageSenderArea.on('swipe', function(e) {
	if (e.direction == 'down') {
		$.messageSenderArea.animate({top:0});
		$.textarea.enabled = true;
	} else if (e.direction == 'up') {
		$.messageSenderArea.animate({top:'-210dp'});
		$.textarea.enabled = false;
	}
});

$.send.on('click', function() {
	$.textarea.blur();
	$.textarea.value = '';
	$.textarea.enabled = false;
	$.messageSenderArea.animate({top:'-210dp'});
});
