module.exports = function(user_id, setData) {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            Ti.API.error(this.responseText);
            var result = JSON.parse(this.responseText);
            (result.status = "ok") ? setData(result.data) : alert(result.message);
        },
        onerror: function(e) {
            alert(e);
        },
        timeout: 15000
    });
    client.open("POST", "http://www.servidordeprueba.net/webs/coffecup_cake/messages/see");
    client.send({
        user_id: Ti.App.Properties.getString("user_id"),
        to_user_id: user_id
    });
};