module.exports = function(user_id) {
    var client = Ti.Network.createHTTPClient({
        onload: function() {},
        onerror: function(e) {
            alert(e);
        },
        timeout: 15000
    });
    client.open("POST", Alloy.CFG.url + "/messages/read");
    client.send({
        to_user_id: Ti.App.Properties.getString("user_id"),
        user_id: user_id
    });
};