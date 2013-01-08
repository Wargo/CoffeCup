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

$.prevMsg.text = L('prev_msg');

var messagesData = [
	{id:1, me:true, message:'Lorem ipsum dolor sit amet, and the playcor weiser, hander.'},
	{id:1, me:false, message:'Lorem ipsum dolor sit amet, and the playcor weiser, hander.'},
	{id:1, me:false, message:'Lorem ipsum dolor sit amet, and the playcor weiser, hander.'},
	{id:1, me:true, message:'Lorem ipsum dolor sit amet, and the playcor weiser, hander.'},
	{id:1, me:false, message:'Lorem ipsum dolor sit amet, and the playcor weiser, hander.'},
	{id:1, me:true, message:'Lorem ipsum dolor sit amet, and the playcor weiser, hander.'}
];

var messages = [];

for (i in messagesData) {
	
	var row = Alloy.createController('message', messagesData[i]).getView();
	
	messages.push(row);
	
}

$.messages.appendRow(messages);

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

$.messageSenderArea.on('swipe', function(e) {
	if (e.direction == 'down') {
		$.messageSenderArea.animate({top:0});
		$.textarea.enabled = true;
	} else if (e.direction == 'up') {
		$.messageSenderArea.animate({top:'-210dp'}, function() {
			$.messages.animate({opacity:0});
			$.prevMsg.text = L('prev_msg');
		});
		$.textarea.enabled = false;
	}
});

$.send.on('singletap', function() {
	$.textarea.value = '';
	$.textarea.enabled = false;
	$.messageSenderArea.animate({top:'-210dp'});
});

$.prevMsg.on('singletap', function() {
	if ($.prevMsg.text == L('close')) {
		$.messages.animate({opacity:0}, function() {
			$.messageSenderArea.animate({top:'-210dp'}, function() {
				$.prevMsg.text = L('prev_msg');
			});
		});
		$.textarea.value = '';
		$.textarea.enabled = false;
	} else {
		$.messageSenderArea.animate({top:(Ti.Platform.displayCaps.platformHeight - 250) + 'dp'}, function() {
			$.messages.animate({opacity:1});
		});
		$.prevMsg.text = L('close');
	}
});

if (Ti.Platform.osname != 'android') {
	$.textarea.on('postlayout', function() {
		$.textarea.setShadow({
			shadowOffset:{x:0,y:2},
			shadowOpacity:0.2,
			shadowRadius:2
		});
	});
	
	$.send.on('postlayout', function() {
		$.send.setShadow({
			shadowOffset:{x:3,y:3},
			shadowOpacity:0.3,
			shadowRadius:3
		});
	});
	
	$.messageSender.on('postlayout', function() {
		$.messageSender.setShadow({
			shadowOffset:{x:0,y:3},
			shadowOpacity:0.3,
			shadowRadius:3
		});
	});
}