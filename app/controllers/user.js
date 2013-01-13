var args = arguments[0] || {};

if (args.id == Ti.App.Properties.getString('user_id')) {
	$.messageSenderArea.parent.remove($.messageSenderArea);
}

var SendMessage = require('addMessage');

$.loader._loaded = false;

$.user.on('open', function() {
	Ti.App.Properties.setString('current_user_id', args.id);
	if ($.loader._loaded == false) {
		$.loader.show();
	}
});

$.user.on('close', function() {
	Ti.App.Properties.setString('current_user_id', null);
})

$.avatar.on('load', function() {
	$.loader.hide();
	$.loader._loaded = true;
	$.avatar.add($.infoHeader)
});

$.avatar.image = args.img_b;
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

Ti.UI.iPhone.appBadge = 0;

Alloy.CFG.messages =  $.messages;

var GetMessages = require('messages');

GetMessages(args.id, setMessages);

function setMessages(messagesData) {
	
	$.messages.data = [];
	
	var messages = [];
	
	for (i in messagesData) {
		
		var row = Alloy.createController('message', messagesData[i]).getView();
		
		messages.push(row);
		
	}
	
	$.messages.appendRow(messages);
	
	$.messages.scrollToIndex($.messages.data[0].rows.length - 1);
	
}

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
		if ($.prevMsg.text == L('close')) {
			$.messages.animate({opacity:1}, function() {
				$.messageSenderArea.animate({opacity:1});
			});
		} else {
			$.messageSenderArea.animate({opacity:1});
		}
	} else {
		$.scrollview.scrollToBottom();
		$.messageSenderArea.animate({opacity:0}, function() {
			$.messages.animate({opacity:0});
		});
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
		$.messageSenderArea.height = '250dp';
		$.textarea.enabled = false;
	}
});

$.textarea.on('blur', function() {
	$.messageSenderArea.height = '250dp';
});
$.textarea.on('focus', function() {
	if ($.prevMsg.text == L('close')) {
		$.messageSenderArea.height = '130dp';
	}
});

$.send.on('singletap', function() {
	if ($.textarea.value) {
		//$.messageSenderArea.animate({top:'-210dp'});
		SendMessage({
			user_id:Ti.App.Properties.getString('user_id'),
			to_user_id:args.id,
			content:$.textarea.value
		}, messageSended);
		
		var new_row = Alloy.createController('message', {content:$.textarea.value, me:true}).getView();
		$.messages.appendRow(new_row);
		$.messages.scrollToIndex($.messages.data[0].rows.length - 1);
		
		$.textarea.value = '';
		//$.textarea.enabled = false;
	}
});

$.prevMsg.on('singletap', function() {
	if ($.prevMsg.text == L('close')) {
		$.messageSenderArea.height = '250dp';
		$.messages.animate({opacity:0}, function() {
			$.messageSenderArea.animate({top:'-210dp'}, function() {
				$.prevMsg.text = L('prev_msg');
			});
		});
		$.textarea.value = '';
		$.textarea.enabled = false;
	} else {
		//$.messageSenderArea.height = '130dp';
		$.textarea.blur();
		$.messageSenderArea.animate({top:(Ti.Platform.displayCaps.platformHeight - 330) + 'dp'}, function() {
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

function messageSended() {
	/*
	Ti.UI.createAlertDialog({
		title:L('sended'),
		ok:L('ok')
	}).show();
	*/
	//GetMessages(args.id, setMessages);
}
