function Controller() {
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
    $.__views.messageSender = A$(Ti.UI.createView({
        id: "messageSender"
    }), "View", $.__views.user);
    $.__views.user.add($.__views.messageSender);
    $.__views.scrollview = A$(Ti.UI.createScrollView({
        contentHeight: "auto",
        id: "scrollview"
    }), "ScrollView", $.__views.user);
    $.__views.user.add($.__views.scrollview);
    $.__views.avatar = A$(Ti.UI.createImageView({
        top: 0,
        height: Ti.Platform.displayCaps.platformHeight,
        width: "320dp",
        id: "avatar"
    }), "ImageView", $.__views.scrollview);
    $.__views.scrollview.add($.__views.avatar);
    $.__views.__alloyId2 = A$(Ti.UI.createView({
        backgroundColor: "#8557658D",
        height: "50dp",
        bottom: 0,
        layout: "vertical",
        id: "__alloyId2"
    }), "View", $.__views.avatar);
    $.__views.avatar.add($.__views.__alloyId2);
    $.__views.name = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        id: "name"
    }), "Label", $.__views.__alloyId2);
    $.__views.__alloyId2.add($.__views.name);
    $.__views.charge = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        id: "charge"
    }), "Label", $.__views.__alloyId2);
    $.__views.__alloyId2.add($.__views.charge);
    $.__views.__alloyId3 = A$(Ti.UI.createView({
        backgroundColor: "#57658D",
        top: Ti.Platform.displayCaps.platformHeight,
        layout: "vertical",
        id: "__alloyId3"
    }), "View", $.__views.scrollview);
    $.__views.scrollview.add($.__views.__alloyId3);
    $.__views.__alloyId4 = A$(Ti.UI.createView({
        height: "70dp",
        borderColor: "#CCC",
        borderWidth: 1,
        id: "__alloyId4"
    }), "View", $.__views.__alloyId3);
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.l_birthday = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        id: "l_birthday"
    }), "Label", $.__views.__alloyId4);
    $.__views.__alloyId4.add($.__views.l_birthday);
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
    }), "Label", $.__views.__alloyId4);
    $.__views.__alloyId4.add($.__views.birthday);
    $.__views.__alloyId5 = A$(Ti.UI.createView({
        height: "70dp",
        borderColor: "#CCC",
        borderWidth: 1,
        id: "__alloyId5"
    }), "View", $.__views.__alloyId3);
    $.__views.__alloyId3.add($.__views.__alloyId5);
    $.__views.l_email = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        id: "l_email"
    }), "Label", $.__views.__alloyId5);
    $.__views.__alloyId5.add($.__views.l_email);
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
    }), "Label", $.__views.__alloyId5);
    $.__views.__alloyId5.add($.__views.email);
    $.__views.__alloyId6 = A$(Ti.UI.createView({
        height: "70dp",
        borderColor: "#CCC",
        borderWidth: 1,
        id: "__alloyId6"
    }), "View", $.__views.__alloyId3);
    $.__views.__alloyId3.add($.__views.__alloyId6);
    $.__views.l_mobile = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        id: "l_mobile"
    }), "Label", $.__views.__alloyId6);
    $.__views.__alloyId6.add($.__views.l_mobile);
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
    }), "Label", $.__views.__alloyId6);
    $.__views.__alloyId6.add($.__views.mobile);
    $.__views.__alloyId7 = A$(Ti.UI.createView({
        height: "140dp",
        borderColor: "#CCC",
        borderWidth: 1,
        id: "__alloyId7"
    }), "View", $.__views.__alloyId3);
    $.__views.__alloyId3.add($.__views.__alloyId7);
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
    }), "Label", $.__views.__alloyId7);
    $.__views.__alloyId7.add($.__views.l_talkmeabout);
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
    }), "Label", $.__views.__alloyId7);
    $.__views.__alloyId7.add($.__views.talkmeabout);
    $.__views.__alloyId8 = A$(Ti.UI.createView({
        height: "70dp",
        borderColor: "#CCC",
        borderWidth: 1,
        id: "__alloyId8"
    }), "View", $.__views.__alloyId3);
    $.__views.__alloyId3.add($.__views.__alloyId8);
    $.__views.l_icomefrom = A$(Ti.UI.createLabel({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        id: "l_icomefrom"
    }), "Label", $.__views.__alloyId8);
    $.__views.__alloyId8.add($.__views.l_icomefrom);
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
    }), "Label", $.__views.__alloyId8);
    $.__views.__alloyId8.add($.__views.icomefrom);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.avatar.image = args.img_p;
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
    $.user.on("swipe", function(e) {
        e.direction == "right" && $.user.close({
            left: "320dp"
        });
    });
    $.scrollview.on("dragend", function(e) {
        e.source.contentOffset.y < 200 ? $.scrollview.scrollTo(0, 0) : $.scrollview.scrollToBottom();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;