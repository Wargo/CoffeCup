function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = A$(Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        id: "row"
    }), "TableViewRow", null);
    $.addTopLevelView($.__views.row);
    $.__views.view = A$(Ti.UI.createView({
        borderColor: "#CCC",
        borderWidth: 1,
        borderRadius: 10,
        height: Ti.UI.SIZE,
        top: "10dp",
        bottom: "10dp",
        id: "view"
    }), "View", $.__views.row);
    $.__views.row.add($.__views.view);
    $.__views.text = A$(Ti.UI.createLabel({
        left: "10dp",
        right: "10dp",
        top: "10dp",
        bottom: "10dp",
        height: "auto",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        color: "#FFF",
        id: "text"
    }), "Label", $.__views.view);
    $.__views.view.add($.__views.text);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.text.text = args.message;
    if (args.me) {
        $.view.backgroundColor = "#50BFFFEF";
        $.view.right = "10dp";
        $.view.left = "80dp";
    } else {
        $.view.backgroundColor = "#507B89A6";
        $.view.right = "80dp";
        $.view.left = "10dp";
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;