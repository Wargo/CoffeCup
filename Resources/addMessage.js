module.exports = function(args, f_confirm) {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            Ti.API.error(this.responseText);
            var result = JSON.parse(this.responseText);
            (result.status = "ok") ? f_confirm() : alert(result.message);
        },
        onerror: function(e) {
            alert(e);
        },
        timeout: 15000
    });
};