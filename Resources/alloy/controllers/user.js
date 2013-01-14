function Controller() {
    function setMessages(messagesData) {
        $.messages.data = [];
        var messages = [];
        for (i in messagesData) {
            var row = Alloy.createController("message", messagesData[i]).getView();
            messages.push(row);
        }
        $.messages.appendRow(messages);
        $.messages.scrollToIndex($.messages.data[0].rows.length - 1);
        $.msgsLoader.hide();
    }
    function send_message() {
        if ($.textarea.value) {
            SendMessage({
                user_id: Ti.App.Properties.getString("user_id"),
                to_user_id: args.id,
                content: $.textarea.value
            }, messageSended);
            var new_row = Alloy.createController("message", {
                content: $.textarea.value,
                me: !0
            }).getView();
            $.messages.appendRow(new_row);
            $.messages.scrollToIndex($.messages.data[0].rows.length - 1);
            $.textarea.value = "";
            if ($.prevMsg.text == L("prev_msg")) {
                $.messageSenderArea.height = "130dp";
                $.messageSenderArea.animate({
                    top: Ti.Platform.displayCaps.platformHeight - 330 + "dp"
                }, function() {
                    $.messages.animate({
                        opacity: 1
                    });
                });
                $.prevMsg.text = L("close");
            }
        }
    }
    function messageSended() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.user = A$(Ti.UI.createWindow({
        backgroundColor: "black",
        left: "320dp",
        width: "320dp",
        id: "user"
    }), "Window", null);
    $.addTopLevelView($.__views.user);
    $.__views.__alloyId2 = A$(Ti.UI.createTableViewRow({
        height: "100%",
        id: "__alloyId2"
    }), "TableViewRow", null);
    var __alloyId3 = [];
    __alloyId3.push($.__views.__alloyId2);
    $.__views.msgsLoader = A$(Ti.UI.createActivityIndicator({
        id: "msgsLoader"
    }), "ActivityIndicator", $.__views.__alloyId2);
    $.__views.__alloyId2.add($.__views.msgsLoader);
    $.__views.messages = A$(Ti.UI.createTableView({
        zIndex: 50,
        opacity: 0,
        bottom: "330dp",
        backgroundColor: "#9057658D",
        separatorColor: "transparent",
        data: __alloyId3,
        id: "messages"
    }), "TableView", $.__views.user);
    $.__views.user.add($.__views.messages);
    $.__views.messageSenderArea = A$(Ti.UI.createView({
        height: "250dp",
        top: "-210dp",
        zIndex: 100,
        id: "messageSenderArea"
    }), "View", $.__views.user);
    $.__views.user.add($.__views.messageSenderArea);
    $.__views.messageSender = A$(Ti.UI.createView({
        backgroundColor: "#57658D",
        bottom: "25dp",
        id: "messageSender"
    }), "View", $.__views.messageSenderArea);
    $.__views.messageSenderArea.add($.__views.messageSender);
    $.__views.prevMsg = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        textAlign: "right",
        top: "10dp",
        id: "prevMsg"
    }), "Label", $.__views.messageSender);
    $.__views.messageSender.add($.__views.prevMsg);
    $.__views.textarea = A$(Ti.UI.createTextArea({
        left: "10dp",
        right: "10dp",
        top: "40dp",
        bottom: "10dp",
        enabled: !1,
        font: {
            fontSize: "18px"
        },
        returnKeyType: Ti.UI.RETURNKEY_SEND,
        id: "textarea"
    }), "TextArea", $.__views.messageSender);
    $.__views.messageSender.add($.__views.textarea);
    $.__views.send = A$(Ti.UI.createView({
        bottom: "12dp",
        height: "35dp",
        width: "70dp",
        backgroundImage: "none",
        backgroundColor: "#57658D",
        borderColor: "#CCC",
        borderWidth: 1,
        id: "send"
    }), "View", $.__views.messageSenderArea);
    $.__views.messageSenderArea.add($.__views.send);
    $.__views.sendImage = A$(Ti.UI.createImageView({
        image: "images/send.png",
        id: "sendImage"
    }), "ImageView", $.__views.send);
    $.__views.send.add($.__views.sendImage);
    $.__views.scrollview = A$(Ti.UI.createScrollView({
        contentHeight: "auto",
        id: "scrollview"
    }), "ScrollView", $.__views.user);
    $.__views.user.add($.__views.scrollview);
    $.__views.avatar = A$(Ti.UI.createImageView({
        defaultImage: "none",
        top: 0,
        height: Ti.Platform.displayCaps.platformHeight,
        width: Ti.Platform.displayCaps.platformWidth,
        id: "avatar"
    }), "ImageView", $.__views.scrollview);
    $.__views.scrollview.add($.__views.avatar);
    $.__views.loader = A$(Ti.UI.createActivityIndicator({
        id: "loader"
    }), "ActivityIndicator", $.__views.avatar);
    $.__views.avatar.add($.__views.loader);
    $.__views.__alloyId4 = A$(Ti.UI.createView({
        backgroundColor: "#57658D",
        top: Ti.Platform.displayCaps.platformHeight,
        layout: "vertical",
        id: "__alloyId4"
    }), "View", $.__views.scrollview);
    $.__views.scrollview.add($.__views.__alloyId4);
    $.__views.__alloyId5 = A$(Ti.UI.createView({
        height: "70dp",
        borderColor: "#CCC",
        borderWidth: 1,
        id: "__alloyId5"
    }), "View", $.__views.__alloyId4);
    $.__views.__alloyId4.add($.__views.__alloyId5);
    $.__views.l_birthday = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        id: "l_birthday"
    }), "Label", $.__views.__alloyId5);
    $.__views.__alloyId5.add($.__views.l_birthday);
    $.__views.birthday = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        textAlign: "right",
        id: "birthday"
    }), "Label", $.__views.__alloyId5);
    $.__views.__alloyId5.add($.__views.birthday);
    $.__views.__alloyId6 = A$(Ti.UI.createView({
        height: "70dp",
        borderColor: "#CCC",
        borderWidth: 1,
        id: "__alloyId6"
    }), "View", $.__views.__alloyId4);
    $.__views.__alloyId4.add($.__views.__alloyId6);
    $.__views.l_email = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        id: "l_email"
    }), "Label", $.__views.__alloyId6);
    $.__views.__alloyId6.add($.__views.l_email);
    $.__views.email = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        textAlign: "right",
        id: "email"
    }), "Label", $.__views.__alloyId6);
    $.__views.__alloyId6.add($.__views.email);
    $.__views.__alloyId7 = A$(Ti.UI.createView({
        height: "70dp",
        borderColor: "#CCC",
        borderWidth: 1,
        id: "__alloyId7"
    }), "View", $.__views.__alloyId4);
    $.__views.__alloyId4.add($.__views.__alloyId7);
    $.__views.l_mobile = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        id: "l_mobile"
    }), "Label", $.__views.__alloyId7);
    $.__views.__alloyId7.add($.__views.l_mobile);
    $.__views.mobile = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        textAlign: "right",
        id: "mobile"
    }), "Label", $.__views.__alloyId7);
    $.__views.__alloyId7.add($.__views.mobile);
    $.__views.__alloyId8 = A$(Ti.UI.createView({
        height: Ti.UI.SIZE,
        borderColor: "#CCC",
        borderWidth: 1,
        id: "__alloyId8"
    }), "View", $.__views.__alloyId4);
    $.__views.__alloyId4.add($.__views.__alloyId8);
    $.__views.l_talkmeabout = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        top: "10dp",
        id: "l_talkmeabout"
    }), "Label", $.__views.__alloyId8);
    $.__views.__alloyId8.add($.__views.l_talkmeabout);
    $.__views.talkmeabout = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        textAlign: "right",
        top: "40dp",
        id: "talkmeabout"
    }), "Label", $.__views.__alloyId8);
    $.__views.__alloyId8.add($.__views.talkmeabout);
    $.__views.__alloyId9 = A$(Ti.UI.createView({
        height: "70dp",
        borderColor: "#CCC",
        borderWidth: 1,
        id: "__alloyId9"
    }), "View", $.__views.__alloyId4);
    $.__views.__alloyId4.add($.__views.__alloyId9);
    $.__views.l_icomefrom = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        id: "l_icomefrom"
    }), "Label", $.__views.__alloyId9);
    $.__views.__alloyId9.add($.__views.l_icomefrom);
    $.__views.icomefrom = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        textAlign: "right",
        id: "icomefrom"
    }), "Label", $.__views.__alloyId9);
    $.__views.__alloyId9.add($.__views.icomefrom);
    $.__views.infoHeader = A$(Ti.UI.createView({
        backgroundColor: "#8557658D",
        height: Ti.UI.SIZE,
        bottom: 0,
        layout: "vertical",
        zIndex: 100,
        id: "infoHeader"
    }), "View", null);
    $.addTopLevelView($.__views.infoHeader);
    $.__views.name = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        id: "name"
    }), "Label", $.__views.infoHeader);
    $.__views.infoHeader.add($.__views.name);
    $.__views.charge = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        id: "charge"
    }), "Label", $.__views.infoHeader);
    $.__views.infoHeader.add($.__views.charge);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.id == Ti.App.Properties.getString("user_id") && $.messageSenderArea.parent.remove($.messageSenderArea);
    var SendMessage = require("addMessage");
    $.loader._loaded = !1;
    $.user.on("open", function() {
        Ti.App.Properties.setString("current_user_id", args.id);
        $.loader._loaded == 0 && $.loader.show();
    });
    $.user.on("close", function() {
        Ti.App.Properties.setString("current_user_id", null);
    });
    $.avatar.on("load", function() {
        $.loader.hide();
        $.loader._loaded = !0;
        $.avatar.add($.infoHeader);
    });
    $.avatar.image = args.img_b;
    $.name.text = args.name;
    $.charge.text = args.charge;
    $.email.text = args.email;
    $.mobile.text = args.mobile;
    $.birthday.text = args.birthday;
    $.icomefrom.text = args.icomefrom;
    $.talkmeabout.text = args.talkmeabout;
    $.l_email.text = L("email");
    $.l_mobile.text = L("mobile");
    $.l_birthday.text = L("birthday");
    $.l_talkmeabout.text = L("talkmeabout");
    $.l_icomefrom.text = L("icomefrom");
    $.prevMsg.text = L("prev_msg");
    Ti.UI.iPhone.appBadge = 0;
    Alloy.CFG.messages = $.messages;
    var GetMessages = require("messages");
    GetMessages(args.id, setMessages);
    $.msgsLoader.show();
    $.user.on("swipe", function(e) {
        e.direction == "right" && $.user.close({
            left: "320dp"
        });
    });
    var y = 0;
    $.scrollview.on("dragstart", function(e) {
        y = e.source.contentOffset.y;
    });
    $.scrollview.on("dragend", function(e) {
        if (e.source.contentOffset.y < y) {
            $.scrollview.scrollTo(0, 0);
            $.prevMsg.text == L("close") ? $.messages.animate({
                opacity: 1
            }, function() {
                $.messageSenderArea.animate({
                    opacity: 1
                });
            }) : $.messageSenderArea.animate({
                opacity: 1
            });
        } else {
            $.scrollview.scrollToBottom();
            $.messageSenderArea.animate({
                opacity: 0
            }, function() {
                $.messages.animate({
                    opacity: 0
                });
            });
        }
    });
    $.messageSenderArea.on("swipe", function(e) {
        if (e.direction == "down") {
            $.messageSenderArea.animate({
                top: 0
            });
            $.textarea.enabled = !0;
        } else if (e.direction == "up") {
            $.messageSenderArea.animate({
                top: "-210dp"
            }, function() {
                $.messages.animate({
                    opacity: 0
                });
                $.prevMsg.text = L("prev_msg");
            });
            $.messageSenderArea.height = "250dp";
            $.textarea.enabled = !1;
        }
    });
    $.textarea.on("blur", function() {
        $.messageSenderArea.height = "250dp";
    });
    $.textarea.on("focus", function() {
        $.prevMsg.text == L("close") && ($.messageSenderArea.height = "130dp");
    });
    $.send.on("singletap", function() {
        send_message();
    });
    $.textarea.on("return", function() {
        $.textarea.focus();
        send_message();
    });
    $.prevMsg.on("singletap", function() {
        if ($.prevMsg.text == L("close")) {
            $.messageSenderArea.height = "250dp";
            $.messages.animate({
                opacity: 0
            }, function() {
                $.messageSenderArea.animate({
                    top: "-210dp"
                }, function() {
                    $.prevMsg.text = L("prev_msg");
                });
            });
            $.textarea.value = "";
            $.textarea.enabled = !1;
        } else {
            $.textarea.blur();
            $.messageSenderArea.animate({
                top: Ti.Platform.displayCaps.platformHeight - 330 + "dp"
            }, function() {
                $.messages.animate({
                    opacity: 1
                });
            });
            $.prevMsg.text = L("close");
        }
    });
    if (Ti.Platform.osname != "android") {
        $.textarea.on("postlayout", function() {
            $.textarea.setShadow({
                shadowOffset: {
                    x: 0,
                    y: 2
                },
                shadowOpacity: 0.2,
                shadowRadius: 2
            });
        });
        $.send.on("postlayout", function() {
            $.send.setShadow({
                shadowOffset: {
                    x: 3,
                    y: 3
                },
                shadowOpacity: 0.3,
                shadowRadius: 3
            });
        });
        $.messageSender.on("postlayout", function() {
            $.messageSender.setShadow({
                shadowOffset: {
                    x: 0,
                    y: 3
                },
                shadowOpacity: 0.3,
                shadowRadius: 3
            });
        });
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;