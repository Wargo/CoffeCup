function Controller() {
    function f_callback(data) {
        var bbdd = Ti.App.Properties.getList("data");
        for (i in bbdd) if (bbdd[i].id == data.from_id) var current_user = bbdd[i];
        if ($.index.currentUser && $.index.currentUser.id == data.from_id) {
            var message = data.alert.replace(current_user.name + ": ", "");
            $.index.currentUser.receiveNotification(message);
        } else {
            LoadNewMsgs($.table);
            var notify = Ti.UI.createWindow({
                zIndex: 150,
                bottom: "-50dp",
                height: "50dp",
                backgroundColor: "#9557658D",
                borderWidth: 1,
                borderColor: "#CCC",
                borderRadius: 5
            });
            notify.add(Ti.UI.createLabel({
                text: data.alert,
                top: "5dp",
                right: "5dp",
                left: "5dp",
                bottom: "5dp",
                color: "#FFF",
                textAlign: "center"
            }));
            notify.open();
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
                current_user.hasUnreadMsgs = !0;
                $.index.currentUser = Alloy.createController("user", current_user);
                $.index.currentUser.getView().open({
                    left: 0
                });
                $.index.currentUser.getView().on("close", function() {
                    $.index.currentUser = null;
                    typeof $.table.data[0] != "undefined" && $.table.data[0].rows.length > 0 && LoadNewMsgs($.table);
                });
            });
        }
    }
    function setData(data) {
        Ti.App.Properties.setList("data", data);
        var rows = [];
        for (var i in data) {
            var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory + data[i].id + ".jpg"), user = Ti.UI.createButton({
                width: "100dp",
                height: "165dp",
                left: "5dp",
                top: "5dp",
                backgroundImage: "none",
                _data: data[i],
                _l: Ti.UI.createActivityIndicator({
                    _dont_delete_me: !0
                }),
                _file: file
            });
            if (file.exists()) user.image = file.nativePath; else {
                user.add(user._l);
                user._l.show();
                user.addEventListener("postlayout", function(e) {
                    var client = Ti.Network.createHTTPClient({
                        onload: function() {
                            e.source.image = this.responseData;
                            e.source._l.hide();
                            e.source._file.write(this.responseData);
                        }
                    });
                    client.open("GET", e.source._data.img_p);
                    client.send();
                });
            }
            user.addEventListener("singletap", function(e) {
                if (Ti.App.Properties.getString("user_id", null)) {
                    var aux = e.source._data;
                    aux.hasUnreadMsgs = e.source.hasUnreadMsgs;
                    $.index.currentUser = Alloy.createController("user", aux);
                    $.index.currentUser.getView().open({
                        left: 0
                    });
                    $.index.currentUser.getView().on("close", function() {
                        $.index.currentUser = null;
                        typeof $.table.data[0] != "undefined" && $.table.data[0].rows.length > 0 && LoadNewMsgs($.table);
                    });
                } else {
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
                            Cloud(f_callback);
                        }
                    });
                }
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
        LoadNewMsgs($.table);
        $.loader.hide();
    }
    function onError() {
        $.loader.hide();
        $.reload.opacity = 1;
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
    $.__views.loader = A$(Ti.UI.createActivityIndicator({
        id: "loader"
    }), "ActivityIndicator", $.__views.index);
    $.__views.index.add($.__views.loader);
    $.__views.reload = A$(Ti.UI.createImageView({
        image: "images/reload.png",
        width: "24dp",
        height: "24dp",
        opacity: 0,
        zIndex: 50,
        id: "reload"
    }), "ImageView", $.__views.index);
    $.__views.index.add($.__views.reload);
    $.__views.table = A$(Ti.UI.createTableView({
        top: "50dp",
        backgroundColor: "transparent",
        separatorColor: "transparent",
        id: "table"
    }), "TableView", $.__views.index);
    $.__views.index.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.headerTitle.on("doubletap", function() {
        var files = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory), aux = files.getDirectoryListing();
        for (i in aux) {
            var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory + aux[i]);
            file.exists() && file.deleteFile();
        }
        $.loader.show();
        $.table.data = [];
        getData(setData, onError);
    });
    LoadNewMsgs = require("load_new_msgs");
    Ti.App.addEventListener("resume", function() {
        typeof $.table.data[0] != "undefined" && $.table.data[0].rows.length > 0 && LoadNewMsgs($.table);
    });
    Ti.App.Properties.setString("current_user_id", null);
    var Cloud = require("cloud");
    Ti.App.Properties.getString("user_id", null) == null ? Ti.UI.createAlertDialog({
        title: L("welcome"),
        message: L("welcome_message"),
        ok: L("ok")
    }).show() : Cloud(f_callback);
    $.headerTitle.text = L("main_title");
    var getData = require("users");
    $.loader.show();
    $.reload.on("click", function() {
        $.loader.show();
        $.reload.opacity = 0;
        getData(setData, onError);
    });
    getData(setData, onError);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;