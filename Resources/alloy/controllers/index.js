function Controller() {
    function f_callback(data) {
        if (data.from_id == Ti.App.Properties.getString("current_user_id", null)) {
            var new_row = Alloy.createController("message", {
                content: data.alert
            }).getView(), messages = Alloy.CFG.messages;
            messages.appendRow(new_row);
            messages.scrollToIndex(messages.data[0].rows.length - 1);
        } else {
            var bbdd = Ti.App.Properties.getList("data");
            for (i in bbdd) if (bbdd[i].id == data.from_id) var current_user = bbdd[i];
            var notify = Ti.UI.createView({
                zIndex: 150,
                bottom: "-50dp",
                height: "50dp",
                backgroundColor: "#9557658D",
                borderWidth: 1,
                borderColor: "#CCC",
                borderRadius: 5
            });
            notify.add(Ti.UI.createLabel({
                text: current_user.name + ": " + data.alert,
                top: "5dp",
                right: "5dp",
                left: "5dp",
                bottom: "5dp",
                color: "#FFF",
                textAlign: "center"
            }));
            $.index.add(notify);
            notify.animate({
                bottom: "-5"
            }, function() {
                setTimeout(function() {
                    notify.animate({
                        opacity: 0
                    });
                }, 5000);
            });
            notify.addEventListener("singletap", function() {
                Alloy.createController("user", current_user).getView().open({
                    left: 0
                });
            });
        }
    }
    function setData(data) {
        Ti.App.Properties.setList("data", data);
        var rows = [];
        for (i in data) {
            var user = Ti.UI.createImageView({
                defaultImage: "none",
                image: data[i].img_p,
                width: "100dp",
                height: "165dp",
                left: "5dp",
                top: "5dp",
                _data: data[i]
            });
            user.addEventListener("touchstart", function(e) {
                $.table.scrollable = !1;
                e.source.opacity = 0.5;
            });
            user.addEventListener("touchend", function(e) {
                $.table.scrollable = !0;
                e.source.opacity = 1;
            });
            user.addEventListener("singletap", function(e) {
                if (Ti.App.Properties.getString("user_id", null)) Alloy.createController("user", e.source._data).getView().open({
                    left: 0
                }); else {
                    var confirm = Ti.UI.createAlertDialog({
                        title: L("confirm"),
                        message: String.format(L("confirm_msg"), e.source._data.name),
                        cancel: 1,
                        buttonNames: [ L("yes"), L("no") ]
                    });
                    confirm.show();
                    confirm.addEventListener("click", function(e2) {
                        if (e2.index === 0) {
                            Ti.UI.createAlertDialog({
                                title: L("done"),
                                message: String.format(L("hello"), e.source._data.name),
                                ok: L("ok")
                            }).show();
                            Ti.App.Properties.setString("user_id", e.source._data.id);
                        }
                    });
                }
            });
            if (i % 3 == 0) {
                var row = Ti.UI.createTableViewRow({
                    layout: "horizontal",
                    height: "170dp"
                });
                Ti.Platform.osname != "android" && (row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE);
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
    Ti.Platform.osname != "android" && require("ti.viewshadow");
    Ti.App.Properties.setString("current_user_id", null);
    if (Ti.App.Properties.getString("user_id", null) == null) Ti.UI.createAlertDialog({
        title: L("welcome"),
        message: L("welcome_message"),
        ok: L("ok")
    }).show(); else {
        var Cloud = require("cloud");
        Cloud(f_callback);
    }
    $.headerTitle.text = L("main_title");
    var getData = require("users");
    getData(setData);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;