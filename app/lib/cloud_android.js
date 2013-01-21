
module.exports = function(f_callback) {

	var Cloud = require('ti.cloud');
	var CloudPush = require('ti.cloudpush');
	
	var username = Ti.App.Properties.getString('user_id');
	var password = 'DKJ3aD8JmV5Nbcd73';
	
	CloudPush.retrieveDeviceToken({
		success: function deviceTokenSuccess(e) {
			//alert('Device Token: ' + e.deviceToken);
	        Ti.App.Properties.setString("device_token", e.deviceToken);
	        register();
		},
		error: function deviceTokenError(e) {
			//alert('Failed to register for push! ' + e.error);
	    }
	});
	
	function register() {
		Cloud.Users.create({
		    username: username,
		    password: password,
		    password_confirmation: password,
		    first_name: "Firstname",
		    last_name: "Lastname"
		}, function (e) {
		    if (e.success) {
		    	Ti.API.info('registerUser OK');
		    } else {
		    	Ti.API.info('error registering user');
		    }
		    login();
		});
	}
	
	function login() {
		Cloud.Users.login({
			login: username,
			password: password
		}, function (e) {
			if (e.success) {
				var user = e.users[0].id;
			    Ti.App.Properties.setString("cloud_user_id", user);
				//alert("login success");
				subscribe();
			} else {
				//alert('Error: ' +((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}
	
	function subscribe() {
		Cloud.PushNotifications.subscribe({
				channel: 'friend_request', // "alert" is channel name
				device_token: Ti.App.Properties.getString("device_token", null),
				type: 'android'
			}, function (e){
			if (e.success) {
				//alert('Subscribed for Push Notification!');
			} else {
				//alert('Error:' +((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}
	
	CloudPush.addEventListener('callback', function (evt) {
	
	//alert(evt);
	
	alert('callback')
	
	//alert(evt.payload);
	
	});
	
	 
	
	CloudPush.addEventListener('trayClickLaunchedApp', function (evt) {
	
	alert('Tray Click Launched App (app was not running)');
	
	//alert('Tray Click Launched App (app was not running');
	
	});
	
	 
	
	CloudPush.addEventListener('trayClickFocusedApp', function (evt) {
	
	alert('Tray Click Focused App (app was already running)');
	
	//alert('Tray Click Focused App (app was already running)');
	
	});
	
}