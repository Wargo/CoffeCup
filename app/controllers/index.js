$.headerTitle.text = L('¿Quién es quién?');

var getData = require('users');

function setData(data) {
	
	var rows = [];
	
	for (i in data) {
		
		var user = Ti.UI.createImageView({
			image:data[i].img_p,
			width:'100dp',
			left:'5dp',
			top:'5dp',
			_data:data[i]
		});
		
		user.addEventListener('singletap', function(e) {
			//alert(e.source._data);
			Alloy.createController('user', e.source._data).getView().open({left:0});
		});
		
		if (i % 3 == 0) {

			var row = Ti.UI.createTableViewRow({
				layout:'horizontal',
				selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
				height:'171.57dp' // Alto proporcional de las fotos si el ancho es 100 ( + 5px del margen )
			});
			rows.push(row);
			
		}
		row.add(user);
		
	}
	
	$.table.appendRow(rows);
	
}

getData(setData);

$.index.open();
