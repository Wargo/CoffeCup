if (Ti.Platform.osname != 'android') {
	require('ti.viewshadow');
}

LoadNewMsgs = require('load_new_msgs');

$.index.on('focus', function() {
	
	if (typeof $.table.data[0] != 'undefined' && $.table.data[0].rows.length > 0) {
		LoadNewMsgs($.table);
	}
	
});

Ti.App.addEventListener('resume', function() {
	
	if (typeof $.table.data[0] != 'undefined' && $.table.data[0].rows.length > 0) {
		LoadNewMsgs($.table);
	}
	
});

function f_callback(data) {
	var bbdd = Ti.App.Properties.getList('data');
	for (i in bbdd) {
		if (bbdd[i].id == data.from_id) {
			var current_user = bbdd[i];
		}
	}
	
	if (data.from_id == Ti.App.Properties.getString('current_user_id', null)) {
		var message = data.alert.replace(current_user.name + ': ', '');
		var new_row = Alloy.createController('message', {content:message}).getView();
		var messages = Alloy.CFG.messages;
		messages.appendRow(new_row);
		messages.scrollToIndex(messages.data[0].rows.length - 1);
	} else {
		LoadNewMsgs($.table);
		var notify = Ti.UI.createView({
			zIndex:150,
			bottom:'-50dp',
			height:'50dp',
			backgroundColor:'#9557658D',
			borderWidth:1,
			borderColor:'#CCC',
			borderRadius:5
		});
		notify.add(Ti.UI.createLabel({
			text:data.alert,
			top:'5dp',
			right:'5dp',
			left:'5dp',
			bottom:'5dp',
			color:'#FFF',
			textAlign:'center'
		}));
		$.index.add(notify);
		notify.animate({bottom:'-5'}, function() {
			setTimeout(function() {
				notify.animate({opacity:0});
			}, 5000);
		});
		notify.addEventListener('singletap', function() {
			current_user.hasUnreadMsgs = true;
			Alloy.createController('user', current_user).getView().open({left:0});
		});
	}
}

Ti.App.Properties.setString('current_user_id', null);

var Cloud = require('cloud');

if (Ti.App.Properties.getString('user_id', null) == null) {
	Ti.UI.createAlertDialog({
		title:L('welcome'),
		message:L('welcome_message'),
		ok:L('ok')
	}).show();
} else {
	Cloud(f_callback);
}

$.headerTitle.text = L('main_title');

var getData = require('users');

function setData(data) {
	
	Ti.App.Properties.setList('data', data);
	
	var rows = [];
	
	for (i in data) {
		
		var user = Ti.UI.createButton({
			width:'100dp',
			height:'165dp',
			left:'5dp',
			top:'5dp',
			backgroundImage:data[i].img_p,
			_data:data[i]
		});
		
		/*user.add(Ti.UI.createImageView({
			defaultImage:'none',
			image:data[i].img_p,
			width:'100dp',
			height:'165dp',
			touchEnabled:false
		}));*/
		/*
		user.addEventListener('touchstart', function(e) {
			$.table.scrollable = false;
			e.source.opacity = 0.5;
		});
		user.addEventListener('touchend', function(e) {
			$.table.scrollable = true;
			e.source.opacity = 1;
		});
		*/
		user.addEventListener('singletap', function(e) {
			if (Ti.App.Properties.getString('user_id', null)) {
				var aux = e.source._data;
				aux.hasUnreadMsgs = e.source.hasUnreadMsgs;
				Alloy.createController('user', aux).getView().open({left:0});
			} else {
				var confirm = Ti.UI.createAlertDialog({
					title:L('confirm'),
					message:String.format(L('confirm_msg'), e.source._data.name),
					cancel:1,
					buttonNames:[L('yes'), L('no')]
				});
				
				confirm.show();
				
				confirm.addEventListener('click', function(e2) {
					if (e2.index === 0) {
						Ti.UI.createAlertDialog({
							title:L('done'),
							message:String.format(L('hello'), e.source._data.name),
							ok:L('ok')
						}).show();
						Ti.App.Properties.setString('user_id', e.source._data.id);
						Cloud(f_callback);
					}
				});
				
			}
		});
		
		if (i % 3 == 0) {

			var row = Ti.UI.createTableViewRow({
				layout:'horizontal',
				//height:'171.57dp' // Alto proporcional de las fotos si el ancho es 100 ( + 5px del margen )
				height:'170dp'
			});
			
			if (Ti.Platform.osname != 'android') {
				row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
			}
			
			rows.push(row);
			
		}
		
		row.add(user);
		
	}
	
	$.table.appendRow(rows);
	
	LoadNewMsgs($.table);
	
	$.loader.hide();
	
}

$.loader.show();

$.reload.on('click', function() {
	$.loader.show();
	$.reload.opacity = 0;
	getData(setData, onError);
});

function onError() {
	$.loader.hide();
	$.reload.opacity = 1;
}

getData(setData, onError);

$.index.open();
