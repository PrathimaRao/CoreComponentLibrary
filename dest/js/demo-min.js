/*! gigya 18-02-2014 */
("undefined" == typeof com || "undefined" == typeof com.art) && ("undefined" != typeof console && console.error("Demo Application > packages.js > FATAL ERROR: com or com.art is not defined. Likely, Core is not loaded. Application will probably not working. Compensating anyway..."), 
"undefined" == typeof com && (com = {}), "undefined" == typeof com.art && (com.art = {})), 
com.art.demo = {}, com.art.demo.modules = {}, com.art.demo.proxies = {}, com.art.demo.components = {}, 
com.art.demo.commands = {}, com.art.demo.vos = {}, com.art.demo.model = {}, art || (art = {}), 
art.model || (art.model = {}), art.model.socialFeed || (art.model.socialFeed = {}), 
art.commands || (art.commands = {}), art.commands.socialFeed || (art.commands.socialFeed = {}), 
art.commands.socialFeed.data || (art.commands.socialFeed.data = {}), art.view || (art.view = {}), 
art.view.socialFeed || (art.view.socialFeed = {}), art.utils || (art.utils = {}), 
art.utils.socialFeed || (art.utils.socialFeed = {});

var DemoCore = function() {
    var a = {}, b = {}, c = {}, d = {}, e = {}, f = "@VERSION@", g = {}, h = {
        STARTUP: "startup"
    }, i = {
        ADDIEMTOGALLERY: "additemtogallery",
        PRODUCTCOMMENT: "productcomment",
        GALLERYCOMMENT: "gallerycomment",
        FOLLOW: "follow",
        ROOMSAVE: "roomsave",
        USERSCOPE_FOLLOWED: "11",
        USERSCOPE_EVERYONE: "0",
        USERSCOPE_USER: "1",
        USERSCOPE_FRIENDS: "2",
        USERSCOPE_FEATURED: "3",
        RECORDCOUNT: "10",
        TIMESTAMP: "",
        TIMESTAMP_START: "1",
        TIMESTAMP_END: "0",
        ANONYMOUS: "1",
        MAXW: "400",
        MAXH: "400",
        SERVICE_FRAME: "1",
        SERVICE_CANVAS_MUSEUM: "4",
        SERVICE_CANVAS_GALLERY: "5",
        SERVICE_MOUNTING: "2",
        SERVICE_ACRYLIC: "3",
        SERVICE_PRINT_ONLY: "6",
        SERVICE_POSTER_CALENDAR: "9",
        SERVICE_LAMINATE: "7",
        SERVICE_LAMINATE_FRAME: "8",
        LOCALIZATIONAPPID: "20"
    }, j = {};
    return {
        getVersion: function() {
            return f;
        },
        events: h,
        constants: i,
        registerModule: function(a) {
            this.registerSubscriber(a);
        },
        registerSubscriber: function(a) {
            if (void 0 == a.NAME) ; else {
                for (var b = a.listNotificationInterests(), d = 0; d < b.length; d++) {
                    var e = b[d];
                    void 0 == j[e] && (j[e] = {}), j[e][a.NAME] = !0;
                }
                c[a.NAME] = a;
            }
        },
        getInterestedSubscribers: function() {
            return j;
        },
        removeModule: function(a) {
            var b = {};
            for (var d in c) d != a && (b[d] = c[d]);
            c = b;
        },
        sendNotification: function(a) {
            for (var b in j[a.name]) void 0 != c[b] && c[b].handleNotification(a);
        },
        clearAll: function() {
            c = {}, j = {};
        },
        startAll: function() {
            for (var a in c) c[a].init();
        },
        startAllByViewMode: function(a) {
            for (var b in c) c[b].init(a);
        },
        startModule: function(a, b) {
            void 0 == b ? c[a].init() : c[a].init(b);
        },
        getSubscriber: function(a) {
            return c[a];
        },
        getSubscribers: function() {
            return c;
        },
        getModule: function(a) {
            return c[a];
        },
        setEnvironment: function(a) {
            d = a;
        },
        getEnvironment: function() {
            return d;
        },
        addToEnvironment: function(a, b) {
            d[a] = b;
        },
        setSubEnvironment: function(a) {
            e = a;
        },
        getSubEnvironment: function() {
            return e;
        },
        addToSubEnvironment: function(a, b) {
            e[a] = b;
        },
        getModel: function() {
            return a;
        },
        getServiceProvider: function() {
            return b;
        },
        getLocalizationManager: function() {
            return g;
        },
        getString: function(a) {
            return a;
        },
        init: function() {},
        isLoggedIn: function() {
            var a = !1, b = new com.art.core.cookie.Cookie();
            return b.getCookieDictionary("ap", "accounttype") != this.constants.ANONYMOUS && (a = !0), 
            a;
        }
    };
}();

art.commands.socialFeed || (art.commands.socialFeed = {}), art.commands.socialFeed.start = function() {}, 
art.commands.socialFeed.showFollowing = function() {
    $("#followingDR").show(), $(".leftContainer").show(), $(".followingRightContainer").show(), 
    $(".rightContainer").addClass("feedFollowingWidth"), $(".YourFeedLoginScreenContainerFollowing").hide(), 
    $(".noUser .feedIR_user").hide(), $("#followingMessageContainer").hide(), $("#friendsMessageContainer").hide();
}, art.commands.socialFeed.hideFollowing = function() {
    $("#feedDR .feedIR_user").show(), $("#followingDR").hide(), $(".leftContainer").hide(), 
    $(".followingRightContainer").hide(), $(".rightContainer").removeClass("feedFollowingWidth"), 
    $("#followingMessageContainer").hide(), $("#friendsMessageContainer").hide(), $("#followingMessageContainer2").hide();
}, art.commands.socialFeed.error = function(a) {
    return void error("community > socialFeedCommands.js > FATAL ERROR: " + a);
}, art.commands.socialFeed.tabClick = function(a) {
    var b = art.commands.socialFeed.getScoialStoreObject();
    b.tabSelectedIndex = a, art.commands.socialFeed.setScoialStoreObject(b);
}, art.commands.socialFeed.setScoialStoreObject = function(a) {
    store.set("SocialApp", a);
}, art.commands.socialFeed.getScoialStoreObject = function() {
    var a = store.get("SocialApp"), b = 3, c = !1;
    return void 0 != a && (b = a.tabSelectedIndex, c = a.onLoad), {
        tabSelectedIndex: b,
        onLoad: c
    };
}, art.commands.socialFeed.clearFeedMessage = function() {}, com.art.demo.model.Config = function(a) {
    var b = this;
    a || (a = {}), this.apiKey = a.apiKey, this.appId = a.appId, this.authToken = a.authToken, 
    this.sessionId = a.sessionId, this.accountID = a.accountID, this.anonymous = a.anonymous, 
    a.serviceUrls || (a.serviceUrls = {}), this.serviceUrls = {
        accountAuthorization: a.serviceUrls.accountAuthorization || "",
        eCommerce: a.serviceUrls.eCommerceAPI || "",
        graphService: a.serviceUrls.graphService || "",
        galleryService: a.serviceUrls.galleryAPIService || ""
    }, this.services = {
        base: new com.art.core.services.ServiceProvider({
            serviceUrlAccountAuthenticationApi: b.serviceUrls.accountAuthorization,
            serviceUrlEcommerceApi: b.serviceUrls.eCommerce,
            graphAPIServiceUrl: b.serviceUrls.graphService,
            galleryServiceUrl: b.serviceUrls.galleryService
        })
    }, this.services.accountAuthorization = this.services.base.accountAuthorizationAPIService, 
    this.services.eCommerceAPI = this.services.base.ecommerceAPIService, this.services.graphService = this.services.base.graphServiceAPI, 
    this.services.galleryService = this.services.base.galleryAPIService;
};

var $c = com.art.demo.model.Config;

$c.getConfigFromServer = function() {}, art.model.socialFeed.dal = {};

var $s = art.model.socialFeed.dal;

$s.feedGet = function(a) {
    a || (a = {});
    var a = {
        apiKey: "519BAAC8E607413CA1FC043C92D08AAD",
        appId: "86627B368CCE4AB5AEF60B710BE521C1",
        authToken: "d7151a3cf93c492182cbd2d5d851a73f",
        sessionId: "C3AF6FA3A94D4EA59837C5AA6FC1C1D3",
        accountID: "290742979",
        anonymous: !0,
        serviceUrls: {
            accountAuthorization: "https://api.art.com/AccountAuthorizationAPI.svc",
            eCommerceAPI: "http://api.art.com/EcommerceAPI.svc",
            graphService: "http://ws-graph.art.com/GraphService.svc",
            galleryAPIService: "http://ws-gallery.art.com/GalleryService.svc"
        }
    }, b = new com.art.demo.model.Config(a), c = this, d = b.services.eCommerceAPI, e = b.apiKey, f = (b.appId, 
    b.authToken), g = b.sessionId, h = art.model.socialFeed.getUserFeedParam.accountId;
    h || (h = null);
    var i = art.model.socialFeed.getUserFeedParam.feedScope, j = 5, k = art.model.socialFeed.getUserFeedParam.timeStamp, l = art.model.socialFeed.getUserFeedParam.timeStampType, m = !a.poll;
    a.beginTimeStamp && (k = a.beginTimeStamp + 1, l = "RecordsAfterTimeStamp"), a.endTimeStamp && (k = a.endTimeStamp, 
    l = "RecordsBeforeTimeStamp");
    var n = c.feedGet_success;
    a.successHandler && (n = a.successHandler);
    var o = {
        successHandler: function(b) {
            n(b, a.onComplete);
        },
        beforeSendHandler: function() {},
        errorHandler: function(a) {
            art.commands.socialFeed.error(DemoCore.getString("Error in GetUserFeed call. Response in console.")), 
            error(a);
        }
    }, p = {
        apiKey: e,
        authToken: f,
        sessionId: g,
        accountID: h,
        feedScope: i,
        recordCount: j,
        timeStamp: k,
        timeStampType: l,
        includeFeedItems: m
    };
    d.FeedGet(o, p), a.poll || (art.model.socialFeed.state.update({
        feedDataEmpty: !1
    }), $("#noMoreItems").addClass("hide"), $("#feedError").removeClass("show"), $("#feedError").addClass("hide"));
}, $s.feedGet_success = function(a) {
    for (var b = a.FeedItemData.FeedItems, c = 0, d = "", e = 0; e < b.length; e++) {
        var f = b[e];
        c++, d += "<div class='innerText'> Item # " + c + " : '" + f.Actors[0].Accounts[0].ProfileInfo.EmailAddress + "' has done some action in community</div>", 
        d += "</div>";
    }
    d += "<div>-------------------------------------------------------</div>", $("#FeedContentCount").append(d), 
    c = 0, localStorage.setItem("feedDataCache", JSON.stringify(a)), setTimeout(function() {
        window._doNotPage = !1;
    }, 400), Controller.notify("community_resumePolling");
}, art.model.socialFeed || (art.model.socialFeed = {}), art.model.socialFeed.feedData = [], 
art.model.socialFeed.followedUsers = [], art.model.socialFeed.youShouldFollow = [], 
art.model.socialFeed.inspiringSpaces = [], art.model.socialFeed.profileInfo = [], 
art.model.socialFeed.plusCount = 990, art.model.socialFeed.TabClick = DemoCore.constants.USERSCOPE_EVERYONE, 
art.model.socialFeed.getUserFeedParam = {
    feedScope: DemoCore.constants.USERSCOPE_EVERYONE,
    recordCount: DemoCore.constants.RECORDCOUNT,
    timeStamp: DemoCore.constants.TIMESTAMP,
    timeStampType: DemoCore.constants.TIMESTAMP_START,
    accountId: ""
}, art.model.socialFeed.currentFollowedUser = null, art.model.socialFeed.status = {
    loading: !1
}, art.model.socialFeed.state = {
    feedDataPopulated: !1,
    feedDataShown: !1,
    feedDataEmpty: !0,
    update: function(a) {
        a || (a = {}), this.feedDataPopulated = isNull(a.feedDataPopulated, this.feedDataPopulated), 
        this.feedDataShown = isNull(a.feedDataShown, this.feedDataShown), this.feedDataEmpty = isNull(a.feedDataEmpty, this.feedDataEmpty), 
        this.feedDataEmpty ? $("#feedDR").hide() : $("#feedDR").show();
    }
}, art.model.socialFeed.shareRequestObj = {
    imageURL: "",
    galleryURL: ""
}, art.model.socialFeed.populate = function() {
    var a = "service";
    switch (this.config = com.art.demo.model.Config.getConfigFromServer(), a) {
      case "mock":
        this.populateModelWithMockData();
        break;

      case "service":
        this.populateModelWithServiceData();
    }
    art.model.socialFeed.validateServiceResponse = function(a, b) {
        var c = !0, d = [];
        if ("object" != typeof a && d.push("gigya app > model.js > validateServiceResponse > ERROR: response is not an object"), 
        a.OperationResponse || d.push("gigya app > model.js > validateServiceResponse > ERROR: no OperationResponse node."), 
        "Success" != a.OperationResponse.ResponseMessage && d.push("gigya app > model.js > validateServiceResponse > ERROR: operation ResponseMessage=" + a.OperationResponse.ResponseMessage), 
        c = 0 == d.length, !c) {
            error(b ? b : "gigya app > model.js > validateServiceResponse > there were errors in the service response. Response object to follow. Errors listed below."), 
            info(a);
            for (var e = 0; e < d.length; e++) info(d[e]);
        }
        return c;
    };
    var b = localStorage.getItem("community_runOnce");
    if (!isNullOrEmpty(b)) {
        var c = JSON.parse(b);
        if ("object" != typeof c) return void error("community > model > invalid runOnce: " + b);
        switch (localStorage.removeItem("community_runOnce"), c.command) {
          case "follow":
            if (!c.target) return void error("community > model > invalid follow command in runOnce: target is null or invalid.");
            setTimeout(function() {
                art.commands.socialFeed.follow(c.target, null, c.target.index, function() {
                    art.model.socialFeed.getFromService_youShouldFollow(), art.model.socialFeed.getFromService_inspiringSpaces();
                }), art.commands.socialFeed.showFeedMessage("You have successfully followed " + c.target.account.name.firstName), 
                art.model.socialFeed.getFromService_profileInfo();
            }, 3e3);
        }
    }
}, art.model.socialFeed.populateModelWithMockData = function() {
    this.feedData = art.model.socialFeed.mockData.getMockFeedData(), this.youShouldFollow = art.model.socialFeed.mockData.getMockFollows(), 
    this.inspiringSpaces = art.model.socialFeed.mockData.getMockInspiringSpaces(), this.followedUsers = art.model.socialFeed.mockData.getMockFollowedUsers(), 
    this.profileInfo = art.model.socialFeed.mockData.getProfileInfo();
}, art.model.socialFeed.populateModelWithServiceData = function() {
    this.getFromService_youShouldFollow(), this.getFromService_inspiringSpaces();
    var a = isNullOrEmpty(localStorage.getItem("community_currentTab"), !1);
    a = a ? parseInt(a) : "NO!";
    var b;
    b = "NO!" != a ? a : DemoCore.isLoggedIn() ? 0 : 3;
    DemoCore.getModule(com.art.demo.modules.socialFeedModule.NAME);
    DemoCore.isLoggedIn() ? (art.model.socialFeed.defaultTab = b, art.view("tn1").tabBar.tabSelect(b), 
    this.getFromService_profileInfo(function() {
        art.view("tn1").tabBar.tabClick(b), $("#feedPreLoadIndicator").hide(), window._socialTab = b;
    }, {
        useCache: !0
    })) : (art.view("tn1").tabBar.tabClick(b), window._socialTab = b, $("#feedPreLoadIndicator").hide());
}, art.model.socialFeed.setUserFeedParameter = function(a, b, c, d, e) {
    art.model.socialFeed.getUserFeedParam.feedScope = a, art.model.socialFeed.getUserFeedParam.recordCount = b, 
    art.model.socialFeed.getUserFeedParam.timeStamp = c, art.model.socialFeed.getUserFeedParam.timeStampType = d, 
    art.model.socialFeed.getUserFeedParam.accountId = e;
}, art.model.socialFeed.validateServiceResponse = function(a, b) {
    var c = !0, d = [];
    if ("object" != typeof a && d.push("gigya app > model.js > validateServiceResponse > ERROR: response is not an object"), 
    a.OperationResponse || d.push("gigya app > model.js > validateServiceResponse > ERROR: no OperationResponse node."), 
    "Success" != a.OperationResponse.ResponseMessage && d.push("gigya app > model.js > validateServiceResponse > ERROR: operation ResponseMessage=" + a.OperationResponse.ResponseMessage), 
    c = 0 == d.length, !c) {
        error(b ? b : "gigya app > model.js > validateServiceResponse > there were errors in the service response. Response object to follow. Errors listed below."), 
        info(a);
        for (var e = 0; e < d.length; e++) info(d[e]);
    }
    return c;
}, art.model.socialFeed.updateFeedContent = function() {
    var a = art.commands.socialFeed.getScoialStoreObject(), b = 3, c = !1;
    if (a && (b = a.tabSelectedIndex, c = a.onLoad), c) if (art.view("tn1").tabBar.tabSelect(b), 
    0 == b) {
        if ("" != art.model.socialFeed.profileInfo) if (art.model.socialFeed.profileInfo.following.length > 0) {
            $("#feedDR").show();
            var d = art.model.socialFeed.profileInfo.following[0];
            art.model.socialFeed.currentFollowedUser = d, art.view("currentFollowedUser").update(), 
            art.view("followingDR").update();
            var e = art.view("feedDR");
            e && e.update && e.update(), art.commands.socialFeed.showFollowing();
        } else $(".YourFeedLoginScreenContainerFollowing").hide(), art.commands.socialFeed.hideFollowing(), 
        $("#feedDR").hide(), $("#feedMoreContainer").hide(), $("#followingMessageContainer").show();
    } else if (1 == b) $("#feedDR").hide(), $(".YourFeedLoginScreenContainerFriends").hide(), 
    $("#friendsMessageContainer").hide(), art.model.socialFeed.feedData.length > 0 ? $("#feedDR").show() : ($("#feedMoreContainer").hide(), 
    $("#friendsMessageContainer").show()); else {
        var e = art.view("feedDR");
        e && e.update ? e.update() : error("gigya app > model.js > unable to update feedDR. Component not found.");
    } else {
        var e = art.view("feedDR");
        e && e.update ? e.update() : error("gigya app > model.js > unable to update feedDR. Component not found.");
    }
}, com.art.demo.modules.socialFeedModule = function(a, b) {
    this.NAME = com.art.demo.modules.socialFeedModule.NAME, this.app = b, this.data = a;
};

var $c = com.art.demo.modules.socialFeedModule, $p = $c.prototype;

$c.NAME = "socialFeedModule.", $p.init = function() {
    this.render(), art.view.update();
}, $p.render = function() {
    this.wireTabBar(), Controller.register("handle_Already_LogIn_Key", this.handle_Already_LogIn, this), 
    Controller.register("handle_Register_LogIn_Key", this.handle_Register_LogIn, this), 
    Controller.register("community_resumePolling", this.startMonitoring, this), this.startMonitoring();
}, $p.wireTabBar = function() {
    Controller.register("socialFeed_followingTabClicked", this.handle_followingFeedClicked, this), 
    Controller.register("socialFeed_friendsTabClicked", this.handle_friendsFeedClicked, this), 
    Controller.register("socialFeed_featuredTabClicked", this.handle_featuredFeedClicked, this), 
    Controller.register("socialFeed_everyoneTabClicked", this.handle_everyoneFeedClicked, this);
}, $p.initFaceBookBtnUI = function(a) {
    art.view.socialFeed.initFaceBookBtnUI(a);
}, $p.setTabClick = function(a, b) {
    var c = art.commands.socialFeed.getScoialStoreObject();
    c.tabSelectedIndex = a, c.onLoad = b, art.commands.socialFeed.setScoialStoreObject(c);
}, $p.handle_followingFeedClicked = function(a, b) {
    b || (b = {}), this.setTabClick(0, !1), art.model.socialFeed.setUserFeedParameter(DemoCore.constants.USERSCOPE_USER, DemoCore.constants.RECORDCOUNT, DemoCore.constants.TIMESTAMP, DemoCore.constants.TIMESTAMP_START, a);
    try {} catch (c) {
        error("community > socialFeedModule.js > could not set current followed user ID for feed call. Expect errors."), 
        error(c);
    }
    if (art.model.socialFeed.feedData = [], art.view("feedDR").update(), DemoCore.isLoggedIn()) if (art.model.socialFeed.profileInfo.following && art.model.socialFeed.profileInfo.following.length > 0) {
        var d = "true" == localStorage.getItem("community_followUsed");
        d ? ($("#feedDR").show(), $("#followingMessageContainer2").hide(), art.commands.socialFeed.showFollowing(), 
        art.model.socialFeed.dal.feedGet({
            onComplete: function() {
                b.doNotRefresh_followingDR || art.view("followingDR").update();
            }
        }), $("#socialFeedModule").attr("showFeed", "true"), $("#socialFeedModule").attr("hideCFU", "false")) : ($("#feedDR").hide(), 
        art.commands.socialFeed.showFollowing(), $("#followingMessageContainer2").show(), 
        $("#socialFeedModule").attr("hideCFU", "true"), b.doNotRefresh_followingDR || art.view("followingDR").update());
    } else $(".YourFeedLoginScreenContainerFollowing").hide(), art.commands.socialFeed.hideFollowing(), 
    $("#feedDR").hide(), $("#feedMoreContainer").hide(), $("#followingMessageContainer").show(), 
    $("#socialFeedModule").attr("showFeed", "false"); else ("" == $("#connectFBBtnLoginFollowing").html() || " " == $("#connectFBBtnLoginFollowing").html()) && this.initFaceBookBtnUI("connectFBBtnLoginFollowing"), 
    $(".YourFeedLoginScreenContainerFollowing").show(), art.commands.socialFeed.hideFollowing(), 
    $("#feedDR").hide(), $("#feedMoreContainer").hide(), $("#socialFeedModule").attr("showFeed", "false");
    art.commands.socialFeed.clearFeedMessage(), $("#infiniteScrollAnchor").removeClass("show"), 
    $("#infiniteScrollAnchor").addClass("hide"), localStorage.setItem("community_currentTab", 0), 
    $("#feedMoreButton").hide();
}, $p.showFollowing = function() {
    $("#followingDR").show(), $(".leftContainer").show(), $(".followingRightContainer").show(), 
    $(".rightContainer").addClass("feedFollowingWidth"), $(".YourFeedLoginScreenContainerFollowing").hide(), 
    $(".noUser .feedIR_user").hide(), $("#followingMessageContainer").hide(), $("#friendsMessageContainer").hide();
}, $p.hideFollowing = function() {
    $("#feedDR .feedIR_user").show(), $("#followingDR").hide(), $(".leftContainer").hide(), 
    $(".followingRightContainer").hide(), $(".rightContainer").removeClass("feedFollowingWidth"), 
    $("#followingMessageContainer").hide(), $("#friendsMessageContainer").hide(), $("#followingMessageContainer2").hide();
}, $p.handle_friendsFeedClicked = function() {
    this.setTabClick(1, !1), art.model.socialFeed.setUserFeedParameter(DemoCore.constants.USERSCOPE_FRIENDS, DemoCore.constants.RECORDCOUNT, DemoCore.constants.TIMESTAMP, DemoCore.constants.TIMESTAMP_START), 
    art.model.socialFeed.feedData = [], art.view("feedDR").update(), art.commands.socialFeed.hideFollowing(), 
    DemoCore.isLoggedIn() ? ($(".YourFeedLoginScreenContainerFriends").hide(), $("#friendsMessageContainer").hide(), 
    art.model.socialFeed.dal.feedGet({
        onComplete: function() {
            art.model.socialFeed.feedData.length > 0 ? $("#socialFeedModule").attr("showFeed", "true") : ($("#feedMoreContainer").hide(), 
            $("#friendsMessageContainer").show(), $("#noMoreItems").removeClass("show"), $("#noMoreItems").addClass("hide"), 
            $("#socialFeedModule").attr("showFeed", "false"));
        }
    })) : ($(".screenContentFriends").text(DemoCore.getString("Connect using facebook to see your friends' activity on art.com.")), 
    ("" == $("#connectFBBtnLoginFriends").html() || " " == $("#connectFBBtnLoginFriends").html()) && this.initFaceBookBtnUI("connectFBBtnLoginFriends"), 
    $("#feedDR").hide(), $(".YourFeedLoginScreenContainerFriends").show(), $("#feedMoreContainer").hide(), 
    $("#socialFeedModule").attr("showFeed", "false")), art.commands.socialFeed.clearFeedMessage(), 
    $("#infiniteScrollAnchor").removeClass("show"), $("#infiniteScrollAnchor").addClass("hide"), 
    localStorage.setItem("community_currentTab", 1), $("#feedMoreButton").hide();
}, $p.handle_featuredFeedClicked = function() {
    this.setTabClick(2, !1), art.model.socialFeed.setUserFeedParameter(DemoCore.constants.USERSCOPE_FEATURED, DemoCore.constants.RECORDCOUNT, DemoCore.constants.TIMESTAMP, DemoCore.constants.TIMESTAMP_START), 
    art.model.socialFeed.feedData = [], art.view("feedDR").update(), art.commands.socialFeed.hideFollowing(), 
    art.model.socialFeed.dal.feedGet({
        onComplete: function() {}
    }), $("#feedDR").show(), $("#socialFeedModule").attr("showFeed", "true"), art.commands.socialFeed.clearFeedMessage(), 
    $("#infiniteScrollAnchor").removeClass("show"), $("#infiniteScrollAnchor").addClass("hide"), 
    localStorage.setItem("community_currentTab", 2), $("#feedMoreButton").hide();
}, $p.handle_everyoneFeedClicked = function() {
    this.setTabClick(3, !1), art.commands.socialFeed.hideFollowing(), art.model.socialFeed.dal.feedGet({
        onComplete: function() {}
    }), art.commands.socialFeed.clearFeedMessage(), localStorage.setItem("community_currentTab", 3), 
    $("#feedMoreButton").hide();
}, $p.handle_Already_LogIn = function() {
    var a = com.art.core.components.LoginModal.LOGIN, b = new com.art.core.utils.Note(MyGalleriesCore.events.SHOW_GLOBAL_LOGINMODAL, {
        loginOption: a
    }, {
        modulename: "GlobalHeader"
    });
    MyGalleriesCore.sendNotification(b);
}, $p.handle_Register_LogIn = function() {
    var a = com.art.core.components.LoginModal.REGISTER, b = new com.art.core.utils.Note(MyGalleriesCore.events.SHOW_GLOBAL_LOGINMODAL, {
        loginOption: a
    }, {
        modulename: "GlobalHeader"
    });
    MyGalleriesCore.sendNotification(b);
}, $p.getTarget = function() {
    return this.data.target;
}, $p.registerEvents = function() {}, $p.listNotificationInterests = function() {
    return [];
}, $p.handleNotification = function(a) {
    a.name;
}, $p.getTemplate = function() {
    return this.template.replace(/\$ID/g, this.NAME);
}, $p.template = "", $p._pollInterval = null, $p.startMonitoring = function() {
    function a() {
        b(), c._pollInterval = window.setTimeout(a, c._intervalLength);
    }
    function b() {
        function a(a) {
            if (!a || !a.FeedItemData) return error("gigya > socialFeedModule.js > polling failed. response is not in the right format. response to follow."), 
            void error(a);
            {
                var b = a.FeedItemData.FeedItemCount;
                a.FeedItemData.NextTimeStamp;
            }
            b > 0 ? ($("#feedMoreButton").show(), $("#scrollToTop").show()) : ($("#scrollToTop").hide(), 
            $("#feedMoreButton").hide());
            var d;
            1 == b ? (d = DemoCore.getString("see 1 new activity"), "25" == MyGalleriesCore.getModel().environment.customerZoneId && (d = "voir 1 nouvelle activite")) : d = 5 == b ? DemoCore.getString("see 5 or more new activities") : DemoCore.getString("see") + " " + b + " " + DemoCore.getString("new activities"), 
            $("#scrollToTop_txt").html(d), $("#scrollToTop").attr("count", b), b > 4 && (info("community > socialFeedModule.js > because feedItemCount>4, halting further polling."), 
            window.clearTimeout(c._pollInterval));
        }
        info("community > socialFeedModule.js > polling service for feed updates. interval was: " + c._intervalLength + "ms");
        var b = art.model.socialFeed._endTimeStamp;
        art.model.socialFeed.dal.feedGet({
            successHandler: a,
            beginTimeStamp: b,
            poll: !0
        });
    }
    var c = this, d = 1e4;
    window.clearTimeout(this._pollInterval), this._intervalLength = d, this._pollInterval = window.setTimeout(a, this._intervalLength), 
    $("#scrollToTop").hide(), window.setInterval(function() {
        c._intervalLength += 1e3, verbose("community > socialFeedModule.js > lengthening interval by 1000 ms. interval is now: " + c._intervalLength);
    }, 2e3);
}, art.view.socialFeed.init = function() {
    var a = "true" == localStorage.getItem("community_followUsed");
    $("#socialFeedModule").attr("followUsed", a), this.initCarousel(), art.view("followDR0") && art.view("followDR0").loading(!0), 
    art.view("followDR1") && art.view("followDR1").loading(!0), art.view("followDR2") && art.view("followDR2").loading(!0), 
    $(".SocialContainer").attr("loggedIn", DemoCore.isLoggedIn());
}, art.view.socialFeed.getFollowText = function(a) {
    var b = a.owner.account.name.displayName(), c = a.follows.length, d = a.owner.account.social.profileUrl, e = "", f = DemoCore.getString("followed");
    e = 1 == c ? f + ": " : f + " " + c + " people:";
    var g = '<a href="{url}">{name}</a> {text}';
    return g = g.replace("{name}", b), g = g.replace("{url}", d), g = g.replace("{text}", e);
}, art.view.socialFeed.initFaceBookBtnUI = function(a) {
    var b = art.model.socialFeed.config, c = new com.art.core.utils.Gigya(b.services.base, null, null, b.apiKey, b.sessionId);
    c.showLoginUI(a, 25, 230, !0), c.registerCallback(c.GIGYA_LOGGED_IN, function(a) {
        if (a.success = 200 == a.artComResponse.OperationResponse.ResponseCode, void 0 != a.facebookResponse && null != a.facebookResponse) {
            var b = a.artComResponse.AuthenticationToken;
            MyGalleriesCore.sendNotification(new com.art.core.utils.Note(MyGalleriesCore.events.FACEBOOK_MERGE_ACCOUNTS, {
                authToken: b
            }, {
                modulename: "GlobalHeader",
                logintfob: !0
            }));
        }
    });
}, art.view.socialFeed.initCarousel = function() {
    var a = art.view("followingDR");
    return a ? void (a.enableButtons = function() {
        var a = document.getElementById(this.id + "_leftButton"), b = document.getElementById(this.id + "_rightButton");
        if (!a) return void warn("core > Carousel > enableButtons > failed! nothing to enable!");
        var c, d = this.leftIndex > 0, e = 1;
        "true" != localStorage.getItem("community_followUsed") && (e = 0), c = "vertical" == this.orientation ? this.leftIndex < this.data.length - e - this.height : this.leftIndex <= this.data.length - 1 - this.width, 
        a.setAttribute("data-enabled", d), b.setAttribute("data-enabled", c);
    }) : void error("community > art.view.socialFeed.initCarousel > could not locate carousel component.");
};

var socialGA = {};

$(document).ready(function() {
    DemoCore.registerModule(new com.art.demo.modules.socialFeedModule({
        target: ""
    }, DemoCore)), DemoCore.startModule(com.art.demo.modules.socialFeedModule.NAME), 
    $art.jvml.tagFinder.method = "tagName", $art.jvml.parseDocument(), art.view("feedDR").update();
}), art.utils.socialFeed.generateUniqueId = function() {
    function a() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
    }
    function b() {
        return a() + "-" + a();
    }
    return b();
}, art.utils.socialFeed.inviteFriends = function() {}, art.utils.socialFeed.followBtnDisplay = function(a) {
    if (isNullOrEmpty(a)) return error("gigya > followBtnDisplay > error: account id not provided."), 
    "none !important";
    var b = "block";
    if (SocialCore.isLoggedIn()) {
        if (isNullOrEmpty(art.model.socialFeed.profileInfo)) return "block";
        var c = art.model.socialFeed.profileInfo.following;
        if (!c || !c.push) return warn("gigya > utils > followingBtnDisplay > profile info not ready; cannot determine status of following button. (when profileInfo comes in, feed should update)"), 
        "none !important";
        for (var d = 0; d < c.length; d++) c[d].account && c[d].account.accountId || (error("gigya > utils > followBtnDisplay > data error; followed user missing account ID. data item to follow."), 
        info(c[d])), c[d].account.accountId == a && (b = "none !important;");
    }
    var e = new com.art.core.cookie.Cookie();
    return e.getCookieDictionary("ap", "accountid") == a && (b = "none !important;"), 
    b;
}, art.utils.socialFeed.followingBtnDisplay = function(a) {
    if (isNullOrEmpty(a)) return error("gigya > followBtnDisplay > error: account id not provided."), 
    "none !important";
    var b = "none !important;", c = !1;
    if (SocialCore.isLoggedIn()) {
        var d = art.model.socialFeed.profileInfo.following;
        if (!d || !d.push) return warn("gigya > utils > followingBtnDisplay > profile info not ready; cannot determine status of following button. (when profileInfo comes in, feed should update)"), 
        "none !important";
        for (var e = 0; e < d.length; e++) d[e].account && d[e].account.accountId || (error("gigya > utils > followBtnDisplay > data error; followed user missing account ID. data item to follow."), 
        info(d[e])), d[e].account.accountId == a && (b = "block !important;", c = !0);
    }
    var f = new com.art.core.cookie.Cookie();
    return f.getCookieDictionary("ap", "accountid") != a || c || (b = "none !important;"), 
    b;
}, art.utils.socialFeed.getAccountId = function() {
    var a = new com.art.core.cookie.Cookie();
    return a.getCookieDictionary("ap", "accountid");
}, art.utils.socialFeed.showFeaturedLabel = function(a) {
    var b, c = "none", d = art.commands.socialFeed.getScoialStoreObject();
    return d && (b = d.tabSelectedIndex), a && 2 != b && (c = "block !important;"), 
    c;
}, art.utils.socialFeed.showFeaturedLabelStar = function(a) {
    var b = "none";
    return a && (b = "block !important;"), b;
}, art.utils.socialFeed.showInviteButton = function() {
    var a = "block";
    return isiOSDevice() && (a = "none !important;"), a;
};