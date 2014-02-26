var DemoCore = (function () {
    var model = {};
    var userLibrary = {};
    var roomViewProxy = {};
    var serviceProvider = {};
    var templateEngine = {};
    var subscribers = {};
    var environment = {};
    var environmentSub = {};
    var version = "@VERSION@";
    var intervalID;
    var loggingManager = {};
    var localizationManager = {};

    var events = {
        STARTUP: 'startup'
    };
    var constants = {
        ADDIEMTOGALLERY: "additemtogallery",
        PRODUCTCOMMENT: "productcomment",
        GALLERYCOMMENT: "gallerycomment",
        FOLLOW: 'follow',
        ROOMSAVE: "roomsave",
        USERSCOPE_FOLLOWED: '11',
        USERSCOPE_EVERYONE: '0',
        USERSCOPE_USER: '1',
        USERSCOPE_FRIENDS: '2',
        USERSCOPE_FEATURED: '3',
        RECORDCOUNT: '10',
        TIMESTAMP: '',
        TIMESTAMP_START: '1',
        TIMESTAMP_END: '0',
        ANONYMOUS: '1',
        MAXW: '400',
        MAXH: '400',
        SERVICE_FRAME: '1',
        SERVICE_CANVAS_MUSEUM: '4',
        SERVICE_CANVAS_GALLERY: '5',
        SERVICE_MOUNTING: '2',
        SERVICE_ACRYLIC: '3',
        SERVICE_PRINT_ONLY: '6',
        SERVICE_POSTER_CALENDAR: '9',
        SERVICE_LAMINATE: '7',
        SERVICE_LAMINATE_FRAME: '8',
        LOCALIZATIONAPPID: '20'
    };

    /*
    * Public API to Application
    */
    var interestedSubscribers = {};
    return {
        "getVersion": function () { return version; },
        "events": events,
        "constants": constants,
        "registerModule": function (module) {
            this.registerSubscriber(module);
        },
        "registerSubscriber": function (observer) {
            if (observer.NAME == undefined) {
                //throw new Error("MyGalleries.registerSubscriber failed! observer.NAME is undefined.");
            }
            else {
                var arr = observer.listNotificationInterests();
                for (var i = 0; i < arr.length; i++) {
                    var noteName = arr[i];
                    if (interestedSubscribers[noteName] == undefined)
                        interestedSubscribers[noteName] = {};

                    interestedSubscribers[noteName][observer.NAME] = true;
                }
                subscribers[observer.NAME] = observer;
            }
        },
        "getInterestedSubscribers": function () { return interestedSubscribers; },
        "removeModule": function (name) {
            var tmp = {};
            for (var m in subscribers) {
                if (m != name)
                    tmp[m] = subscribers[m];
            }
            subscribers = tmp;
        },
        "sendNotification": function (note) {
            //trace("note.name: "+note.name);
            for (var m in interestedSubscribers[note.name]) {
                if (subscribers[m] != undefined)
                    subscribers[m].handleNotification(note);
            }
        },
        "clearAll": function () {
            subscribers = {};
            interestedSubscribers = {};
        },
        "startAll": function () {
            for (var subscriber in subscribers) {
                //trace("module.init: "+subscriber);
                subscribers[subscriber].init();
            }
        },
        "startAllByViewMode": function (viewmode) {
            for (var subscriber in subscribers) {
                subscribers[subscriber].init(viewmode);
            }
        },
        "startModule": function (name, obj) {
            if (obj == undefined) {
                subscribers[name].init();
            }
            else {
                subscribers[name].init(obj);
            }
        },
        "getSubscriber": function (name) {
            return subscribers[name];
        },
        "getSubscribers": function (name) {
            return subscribers;
        },
        "getModule": function (name) {
            return subscribers[name];
        },
        "setEnvironment": function (obj) {
            environment = obj;
        },
        "getEnvironment": function () {
            return environment;
        },
        "addToEnvironment": function (key, value) {
            environment[key] = value;
        },
        "setSubEnvironment": function (obj) {
            environmentSub = obj;
        },
        "getSubEnvironment": function () {
            return environmentSub;
        },
        "addToSubEnvironment": function (key, value) {
            environmentSub[key] = value;
        },
        "getModel": function () { return model; },
        "getServiceProvider": function () { return serviceProvider; },
        "getLocalizationManager": function () { return localizationManager; },
        "getString": function (baseString) { return baseString; },
        "init": function (envObj, viewMode, envObjSub) {

        },
        "isLoggedIn": function () {
            //To Check whether user has logged in or not.
            var t = false;
            var cookieobject = new com.art.core.cookie.Cookie();
            if (cookieobject.getCookieDictionary('ap', 'accounttype') != this.constants.ANONYMOUS)
                t = true;
            return t;
        }
    };
})();
