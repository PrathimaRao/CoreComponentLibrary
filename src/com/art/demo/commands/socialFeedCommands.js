if (!art.commands.socialFeed) art.commands.socialFeed = {};

art.commands.socialFeed.start = function() {
	
};

art.commands.socialFeed.showFollowing = function () {
    $('#followingDR').show();
    $(".leftContainer").show();
    $(".followingRightContainer").show();
    $(".rightContainer").addClass('feedFollowingWidth');
    $('.YourFeedLoginScreenContainerFollowing').hide();
    $('.noUser .feedIR_user').hide();
    $("#followingMessageContainer").hide();
    $("#friendsMessageContainer").hide();
};

art.commands.socialFeed.hideFollowing = function () {
    $('#feedDR .feedIR_user').show();
    $('#followingDR').hide();
    $(".leftContainer").hide();
    $(".followingRightContainer").hide();
    $(".rightContainer").removeClass('feedFollowingWidth');
    $("#followingMessageContainer").hide();
    $("#friendsMessageContainer").hide();
    $('#followingMessageContainer2').hide();
};

art.commands.socialFeed.error = function(str) {
	// presents a friendly error message to the user when a fatal error occurs.
	// shows detailed error (str) in console.
	error('community > socialFeedCommands.js > FATAL ERROR: '+str);
	return;

	var node = document.createElement('div');
	node.setAttribute('id','friendlyError');
	node.innerHTML = '<div style="position: fixed; width: 50%; left: 25%; height: 50%; top: 25%; background: red; padding: 20px; color: white; box-sizing: border-box;">'+
			'<h3>The application has encountered an error.</h3>'+
			'<p>'+str+'</p>'+
		'</div>';
	node.onclick = function() {
		var f = document.getElementById('friendlyError');
		f.parentElement.removeChild(f);
	};
	document.body.appendChild(node);
}

art.commands.socialFeed.tabClick = function(index) {
	var obj = art.commands.socialFeed.getScoialStoreObject();
	obj.tabSelectedIndex = index;
	art.commands.socialFeed.setScoialStoreObject(obj);
};

art.commands.socialFeed.setScoialStoreObject = function (obj) {
    store.set("SocialApp", obj);
};
art.commands.socialFeed.getScoialStoreObject = function () {
    var obj = store.get("SocialApp");
    var tabSelectedIndex = 3, onLoad = false;
    if (obj != undefined) {
        tabSelectedIndex = obj.tabSelectedIndex;
        onLoad = obj.onLoad;
    }
    return { "tabSelectedIndex": tabSelectedIndex, "onLoad": onLoad };
};
art.commands.socialFeed.clearFeedMessage = function () {
    //art.model.socialFeed.feedMessage = null;
    //if (art.view('feedMessage')) art.view('feedMessage').update();
};
