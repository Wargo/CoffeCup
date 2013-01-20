module.exports = function(f_callback) {
    function login() {
        Cloud.Users.login({
            login: "push123",
            password: "push123"
        }, function(e) {
            if (e.success) {
                var user = e.users[0].id;
                Ti.App.Properties.setString("cloud_user_id", user);
                alert("login success");
                susbcribe();
            } else alert("Error: " + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function subscribe() {
        Cloud.PushNotifications.subscribe({
            channel: "friend_request",
            device_token: deviceToken,
            type: "android"
        }, function(e) {
            e.success ? alert("Subscribed for Push Notification!") : alert("Error:" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    var Cloud = require("ti.cloud"), CloudPush = require("ti.cloudpush");
    CloudPush.retrieveDeviceToken({
        success: function deviceTokenSuccess(e) {
            alert("Device Token: " + e.deviceToken);
            deviceToken = e.deviceToken;
            login();
        },
        error: function deviceTokenError(e) {
            alert("Failed to register for push! " + e.error);
        }
    });
    CloudPush.addEventListener("callback", function(evt) {});
    CloudPush.addEventListener("trayClickLaunchedApp", function(evt) {
        Ti.API.info("Tray Click Launched App (app was not running)");
    });
    CloudPush.addEventListener("trayClickFocusedApp", function(evt) {
        Ti.API.info("Tray Click Focused App (app was already running)");
    });
};