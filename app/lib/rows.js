
module.exports = function(data, tableView) {
	
	//var rows = [];
	
	for (i in data) {
		
		var client = Ti.Network.createHTTPClient({
			onload:function() {
				
				var user = Ti.UI.createButton({
					width:'100dp',
					height:'165dp',
					left:'5dp',
					top:'5dp',
					backgroundImage:'none',
					image:this.responseData,
					_data:data[i]
				});

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
					
					//rows.push(row);
					tableView.appendRow(row);
					
				}
				
				row.add(user);
			}
			
		});
		client.open('GET', data[i].img_p);
		client.send();
		
	}
	
}
