module.exports = function(f_callback) {
    function register() {
        Cloud.Users.create({
            username: username,
            password: password,
            password_confirmation: password,
            first_name: "Firstname",
            last_name: "Lastname"
        }, function(e) {
            e.success ? Ti.API.info("registerUser OK") : Ti.API.info("error registering user");
            login();
        });
    }
    function login() {
        Cloud.Users.login({
            login: username,
            password: password
        }, function(e) {
            if (e.success) {
                var user = e.users[0].id;
                Ti.App.Properties.setString("cloud_user_id", user);
                subscribe();
            }
        });
    }
    function subscribe() {
        Cloud.PushNotifications.subscribe({
            channel: "friend_request",
            device_token: Ti.App.Properties.getString("device_token", null),
            type: "android"
        }, function(e) {
            !e.success;
        });
    }
    var Cloud = require("ti.cloud"), CloudPush = require("ti.cloudpush"), username = Ti.App.Properties.getString("user_id"), password = "DKJ3aD8JmV5Nbcd73";
    CloudPush.retrieveDeviceToken({
        success: function deviceTokenSuccess(e) {
            Ti.App.Properties.setString("device_token", e.deviceToken);
            register();
        },
        error: function deviceTokenError(e) {}
    });
    CloudPush.addEventListener("callback", function(evt) {
        alert("callback");
    });
    CloudPush.addEventListener("trayClickLaunchedApp", function(evt) {
        alert("Tray Click Launched App (app was not running)");
    });
    CloudPush.addEventListener("trayClickFocusedApp", function(evt) {
        alert("Tray Click Focused App (app was already running)");
    });
};