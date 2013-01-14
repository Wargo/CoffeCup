module.exports = function(setData, onError) {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var result = JSON.parse(this.responseText);
            (result.status = "ok") ? setData(result.data) : alert(result.message);
        },
        onerror: function(e) {
            Ti.API.error("error de conexión");
            onError();
        },
        timeout: 15000
    });
    client.open("POST", Alloy.CFG.url + "/users/json");
    client.send({
        w: Ti.Platform.displayCaps.platformWidth,
        h: Ti.Platform.displayCaps.platformHeight
    });
};