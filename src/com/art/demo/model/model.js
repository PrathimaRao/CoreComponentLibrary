// MODEL
if (!art.model.socialFeed) art.model.socialFeed = {};

art.model.socialFeed.feedData = []; // contains the data powering the main social feed: an array of various kinds of VO
art.model.socialFeed.followedUsers = []; // contains an array of users who you are following
art.model.socialFeed.youShouldFollow = []; // contains an array of users who we recommend that you should follow
art.model.socialFeed.inspiringSpaces = []; // contains an array of spaces who we recommend that you should follow
art.model.socialFeed.profileInfo=[];
art.model.socialFeed.plusCount = 990;
art.model.socialFeed.TabClick = DemoCore.constants.USERSCOPE_EVERYONE;
art.model.socialFeed.getUserFeedParam = {
		"feedScope":DemoCore.constants.USERSCOPE_EVERYONE,
		"recordCount":DemoCore.constants.RECORDCOUNT,
		"timeStamp":DemoCore.constants.TIMESTAMP,
		"timeStampType":DemoCore.constants.TIMESTAMP_START,
		'accountId':''
};
art.model.socialFeed.currentFollowedUser = null;

art.model.socialFeed.status = {
	loading: false
};

art.model.socialFeed.state = {
	feedDataPopulated: false,
	feedDataShown: false,
	feedDataEmpty: true,
	update: function(args) {
		if (!args) args = {};
		this.feedDataPopulated = isNull(args.feedDataPopulated,this.feedDataPopulated);
		this.feedDataShown = isNull(args.feedDataShown,this.feedDataShown);
		this.feedDataEmpty = isNull(args.feedDataEmpty,this.feedDataEmpty);
		// if (this.feedDataPopulated&&this.feedDataShown&&!this.feedDataEmpty) $('#infiniteScrollAnchor').show();
		// else $('#infiniteScrollAnchor').hide();

		if (this.feedDataEmpty) $('#feedDR').hide();
		else $('#feedDR').show();
	}
};

art.model.socialFeed.shareRequestObj = {
	"imageURL":"",
	"galleryURL":""
};
art.model.socialFeed.populate = function() {
	// populates the model for the socialFeed
	var _this = this;
	
	var dataSource = 'service'; // 'service'
	var filterType = 'everyone'; // 'featured', 'friends', 'following'
	
	// config
	this.config = com.art.demo.model.Config.getConfigFromServer();
	
	// populate model
	switch (dataSource) {
		case 'mock': this.populateModelWithMockData(); break;
		case 'service': this.populateModelWithServiceData(); break;
} art.model.socialFeed.validateServiceResponse = function (response, message) {
    var valid = true;
    var errors = [];
    if (typeof (response) != 'object') { errors.push('gigya app > model.js > validateServiceResponse > ERROR: response is not an object'); }
    if (!response.OperationResponse) { errors.push('gigya app > model.js > validateServiceResponse > ERROR: no OperationResponse node.'); }
    //if (response.OperationResponse.ResponseCode!=200) { error('gigya app > model.js > validateServiceResponse > ERROR: operation responseCode='+response.OperationResponse.ResponseCode);  }
    if (response.OperationResponse.ResponseMessage != 'Success') { errors.push('gigya app > model.js > validateServiceResponse > ERROR: operation ResponseMessage=' + response.OperationResponse.ResponseMessage); }

    valid = errors.length == 0;
    if (!valid) {
        if (message) error(message);
        else error('gigya app > model.js > validateServiceResponse > there were errors in the service response. Response object to follow. Errors listed below.');
        info(response);
        for (var i = 0; i < errors.length; i++) {
            info(errors[i]);
        }
    }
    return valid;
};

	// now that model is populated, we can handle any "runOnce" commands
	var runOnce = localStorage.getItem('community_runOnce');
	if (!isNullOrEmpty(runOnce)) {
		var cmd = JSON.parse(runOnce);
		if (typeof(cmd)!='object') {
			error('community > model > invalid runOnce: '+runOnce);
			return;
		}
		// clear it out so it indeed only runs once
		localStorage.removeItem('community_runOnce');

		switch (cmd.command) {
			case 'follow':
				if(!cmd.target) {
					error('community > model > invalid follow command in runOnce: target is null or invalid.');
					return;
				}
				setTimeout(function(){ 
					art.commands.socialFeed.follow(cmd.target,null,cmd.target.index,function() {
						art.model.socialFeed.getFromService_youShouldFollow();
						art.model.socialFeed.getFromService_inspiringSpaces();
					});
					art.commands.socialFeed.showFeedMessage('You have successfully followed '+cmd.target.account.name.firstName); 
					art.model.socialFeed.getFromService_profileInfo();
				},3000);
				break;
		}


	}
};

art.model.socialFeed.populateModelWithMockData = function() {
	this.feedData = art.model.socialFeed.mockData.getMockFeedData();
	this.youShouldFollow = art.model.socialFeed.mockData.getMockFollows();
	this.inspiringSpaces = art.model.socialFeed.mockData.getMockInspiringSpaces();
	this.followedUsers = art.model.socialFeed.mockData.getMockFollowedUsers();	
	this.profileInfo=art.model.socialFeed.mockData.getProfileInfo();
};
art.model.socialFeed.populateModelWithServiceData = function() {
	// to be implemented. pseudocode below
	
	/*
	 * invoke Core web service methods to query the service
	 * create source arrays such as this.feedData, this.followedUsers, etc:
	 *  ... create each array using the VOs defined in this application's Model, such as GalleryItemVO, CommentVO, etc
	 *  ... each of those VOs contain several other VOs defined on the Core level, such as ProductVO, UserVO, RoomVO, etc
	 *  ... for Core VOs, use adapter functions to populate a standard Core VO from the service data
	 *  ... then, assemble the local VOs, in a manner similar to the mockData functions
	 *  ... once the model is thus populated, the UI can render 
	 */	
	
	
	this.getFromService_youShouldFollow();
	
	this.getFromService_inspiringSpaces();
	
	var savedTab = isNullOrEmpty(localStorage.getItem('community_currentTab'),false);
	if (savedTab) savedTab = parseInt(savedTab);
	else savedTab = 'NO!';

	var startTab;
	if (savedTab!='NO!') startTab = savedTab;
	else if (DemoCore.isLoggedIn()) startTab = 0;
	else startTab = 3;

	var m = DemoCore.getModule(com.art.demo.modules.socialFeedModule.NAME);
	
	if (DemoCore.isLoggedIn()) {
		art.model.socialFeed.defaultTab = startTab;
		art.view('tn1').tabBar.tabSelect(startTab);
		this.getFromService_profileInfo( function() {
			art.view('tn1').tabBar.tabClick(startTab);
			$('#feedPreLoadIndicator').hide();
			window['_socialTab'] = startTab;
		},{useCache:true});
	} else {
		art.view('tn1').tabBar.tabClick(startTab);
		window['_socialTab'] = startTab;
		$('#feedPreLoadIndicator').hide();
	}
	
	return;

	
	//this.followedUsers = art.model.socialFeed.mockData.getMockFollowedUsers();
	

	// get cached feed; this will be updated when the new feed comes in
	/*
	var feedDataCache = localStorage.getItem('feedDataCache');
	if (!isNullOrEmpty(feedDataCache)) {
		feedDataCache = JSON.parse(feedDataCache);
			art.model.socialFeed.getFromService_feedData_successHandler(feedDataCache);
	}
	*/

};

art.model.socialFeed.setUserFeedParameter = function(fs, rc, ts, tst, accountId) {
	if (!accountId) accountId == '';
	art.model.socialFeed.getUserFeedParam.feedScope = fs;
	art.model.socialFeed.getUserFeedParam.recordCount = rc;
	art.model.socialFeed.getUserFeedParam.timeStamp = ts;
	art.model.socialFeed.getUserFeedParam.timeStampType = tst;
	art.model.socialFeed.getUserFeedParam.accountId = accountId;
};

art.model.socialFeed.validateServiceResponse = function (response, message) {
    var valid = true;
    var errors = [];
    if (typeof (response) != 'object') { errors.push('gigya app > model.js > validateServiceResponse > ERROR: response is not an object'); }
    if (!response.OperationResponse) { errors.push('gigya app > model.js > validateServiceResponse > ERROR: no OperationResponse node.'); }
    //if (response.OperationResponse.ResponseCode!=200) { error('gigya app > model.js > validateServiceResponse > ERROR: operation responseCode='+response.OperationResponse.ResponseCode);  }
    if (response.OperationResponse.ResponseMessage != 'Success') { errors.push('gigya app > model.js > validateServiceResponse > ERROR: operation ResponseMessage=' + response.OperationResponse.ResponseMessage); }

    valid = errors.length == 0;
    if (!valid) {
        if (message) error(message);
        else error('gigya app > model.js > validateServiceResponse > there were errors in the service response. Response object to follow. Errors listed below.');
        info(response);
        for (var i = 0; i < errors.length; i++) {
            info(errors[i]);
        }
    }
    return valid;
};

art.model.socialFeed.updateFeedContent = function () {
    var obj = art.commands.socialFeed.getScoialStoreObject();
    var tc = 3, t = false;
    if (obj) {
        tc = obj.tabSelectedIndex;
        t = obj.onLoad;
    }

    if (t) {

        art.view('tn1').tabBar.tabSelect(tc);

        if (tc == 0) {
            if (art.model.socialFeed.profileInfo != "") {
                if (art.model.socialFeed.profileInfo.following.length > 0) {
                    $('#feedDR').show();
                    var user = art.model.socialFeed.profileInfo.following[0];
                    art.model.socialFeed.currentFollowedUser = user;
                    art.view('currentFollowedUser').update();
                    art.view('followingDR').update();
                    var comp = art.view('feedDR');
                    if (comp && comp.update) comp.update();
                    art.commands.socialFeed.showFollowing();
                }
                else {
                    $('.YourFeedLoginScreenContainerFollowing').hide();
                    art.commands.socialFeed.hideFollowing();
                    $('#feedDR').hide();
                    $('#feedMoreContainer').hide();
                    $("#followingMessageContainer").show();
                }
            }
        }
        else if (tc == 1) {
            $('#feedDR').hide();
            $('.YourFeedLoginScreenContainerFriends').hide();
            $("#friendsMessageContainer").hide();
            if (art.model.socialFeed.feedData.length > 0) {
                $('#feedDR').show();
            }
            else {
                $('#feedMoreContainer').hide();
                $("#friendsMessageContainer").show();
            }
        }
        else {
            var comp = art.view('feedDR');
            if (comp && comp.update) comp.update();
            else error('gigya app > model.js > unable to update feedDR. Component not found.');
        }
    }
    else {
        var comp = art.view('feedDR');
        if (comp && comp.update) comp.update();
        else error('gigya app > model.js > unable to update feedDR. Component not found.');
    }
};