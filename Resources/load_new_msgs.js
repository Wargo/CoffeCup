module.exports = function(tableView) {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            Ti.API.error(this.responseText);
            var result = JSON.parse(this.responseText);
            if (result.status == "ok") {
                var data = tableView.data[0].rows;
                for (i in data) {
                    var elements = data[i].children;
                    for (j in elements) {
                        for (d in elements[j].children) elements[j].remove(elements[j].children[d]);
                        var num = Ti.UI.createView({
                            backgroundColor: "#57658D",
                            right: "5dp",
                            bottom: "5dp",
                            borderWidth: 1,
                            borderColor: "#CCC",
                            borderRadius: 5,
                            height: Ti.UI.SIZE,
                            width: Ti.UI.SIZE,
                            layout: "horizontal"
                        });
                        num.add(Ti.UI.createLabel({
                            text: result.data[elements[j]._data.id],
                            left: "5dp",
                            color: "#CCC",
                            font: {
                                fontSize: "15dp",
                                fontWeight: "bold"
                            },
                            textAlign: "center"
                        }));
                        num.add(Ti.UI.createImageView({
                            image: "images/send.png",
                            width: "15dp",
                            left: "5dp",
                            right: "5dp"
                        }));
                        result.data[elements[j]._data.id] > 0 && elements[j].add(num);
                    }
                }
            } else alert(result.message);
        },
        onerror: function(e) {
            alert(e);
        },
        timeout: 15000
    });
    client.open("POST", Alloy.CFG.url + "/messages/unread");
    client.send({
        user_id: Ti.App.Properties.getString("user_id")
    });
};