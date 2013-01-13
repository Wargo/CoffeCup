
module.exports = function(setData) {
	
	var client = Ti.Network.createHTTPClient({
		onload:function() {
			//Ti.API.error(this.responseText);
			
			var result = JSON.parse(this.responseText);
			
			if (result.status = 'ok') {
				setData(result.data);
			} else {
				alert(result.message);
			}
		},
		onerror:function(e) {
			alert(e);
		},
		timeout:15000
	});
	
	client.open('POST', Alloy.CFG.url + '/users/json');
	
	client.send({
		w:Ti.Platform.displayCaps.platformWidth,
		h:Ti.Platform.displayCaps.platformHeight
	});
		
}
