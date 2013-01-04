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

$.scrollview.on('dragend', function(e) {
	if (e.source.contentOffset.y < 200) {
		$.scrollview.scrollTo(0,0);
	} else {
		$.scrollview.scrollToBottom();
	}
});
