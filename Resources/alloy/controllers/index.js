function Controller() {
    function setData(data) {
        var rows = [];
        for (i in data) {
            var user = Ti.UI.createButton({
                backgroundImage: data[i].img_p,
                width: "100dp",
                height: "165dp",
                left: "5dp",
                top: "5dp",
                _data: data[i]
            });
            user.addEventListener("singletap", function(e) {
                Alloy.createController("user", e.source._data).getView().open({
                    left: 0
                });
            });
            if (i % 3 == 0) {
                var row = Ti.UI.createTableViewRow({
                    layout: "horizontal",
                    height: "170dp"
                });
                rows.push(row);
            }
            row.add(user);
        }
        $.table.appendRow(rows);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = A$(Ti.UI.createWindow({
        backgroundColor: "black",
        id: "index"
    }), "Window", null);
    $.addTopLevelView($.__views.index);
    $.__views.__alloyId1 = A$(Ti.UI.createView({
        top: 0,
        height: "50dp",
        backgroundColor: "#57658D",
        id: "__alloyId1"
    }), "View", $.__views.index);
    $.__views.index.add($.__views.__alloyId1);
    $.__views.headerTitle = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "20dp",
            fontWeight: "bold"
        },
        shadowColor: "#333",
        shadowOffset: {
            x: 1,
            y: 1
        },
        id: "headerTitle"
    }), "Label", $.__views.__alloyId1);
    $.__views.__alloyId1.add($.__views.headerTitle);
    $.__views.table = A$(Ti.UI.createTableView({
        top: "50dp",
        backgroundColor: "transparent",
        separatorColor: "transparent",
        id: "table"
    }), "TableView", $.__views.index);
    $.__views.index.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.headerTitle.text = L("¿Quién es quién?");
    var getData = require("users");
    getData(setData);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;