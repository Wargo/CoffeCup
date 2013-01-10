module.exports = function(setData) {
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
    client.open("POST", "http://www.servidordeprueba.net/webs/coffecup_cake/users/json");
    client.send({
        w: Ti.Platform.displayCaps.platformWidth,
        h: Ti.Platform.displayCaps.platformHeight
    });
};