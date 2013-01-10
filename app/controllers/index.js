if (Ti.Platform.osname != 'android') {
	require('ti.viewshadow');
}

if (Ti.App.Properties.getString('user_id', null) == null) {
	Ti.UI.createAlertDialog({
		title:L('welcome'),
		message:L('welcome_message'),
		ok:L('ok')
	}).show();
}

$.headerTitle.text = L('main_title');

var getData = require('users');

function setData(data) {
	
	var rows = [];
	
	for (i in data) {
		
		var user = Ti.UI.createImageView({
			defaultImage:'none',
			image:data[i].img_p,
			width:'100dp',
			height:'165dp',
			left:'5dp',
			top:'5dp',
			_data:data[i]
		});
		
		user.addEventListener('touchstart', function(e) {
			$.table.scrollable = false;
			e.source.opacity = 0.5;
		});
		user.addEventListener('touchend', function(e) {
			$.table.scrollable = true;
			e.source.opacity = 1;
		});
		
		user.addEventListener('singletap', function(e) {
			if (Ti.App.Properties.getString('user_id', null)) {
				Alloy.createController('user', e.source._data).getView().open({left:0});
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
	
}

getData(setData);

$.index.open();
