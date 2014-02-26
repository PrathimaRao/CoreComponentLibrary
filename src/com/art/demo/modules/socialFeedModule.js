com.art.demo.modules.socialFeedModule = function(data, app)
{
    this.NAME = com.art.demo.modules.socialFeedModule.NAME;
    this.app = app;
    this.data = data;
};

var $c = com.art.demo.modules.socialFeedModule;
var $p = $c.prototype;

$c.NAME = "socialFeedModule.";

$p.init = function()
{
    this.render();
    art.view.update();
};

$p.render = function()
{
	this.wireTabBar();
	Controller.register('handle_Already_LogIn_Key',this.handle_Already_LogIn,this);
	Controller.register('handle_Register_LogIn_Key',this.handle_Register_LogIn,this);

	Controller.register('community_resumePolling',this.startMonitoring,this);
	

	//Controller.register('community_startMonitoring',this.startMonitoring,this);
	this.startMonitoring();
	
};

$p.wireTabBar = function() {
	Controller.register('socialFeed_followingTabClicked',this.handle_followingFeedClicked,this);
	Controller.register('socialFeed_friendsTabClicked',this.handle_friendsFeedClicked,this);
	Controller.register('socialFeed_featuredTabClicked',this.handle_featuredFeedClicked,this);
	Controller.register('socialFeed_everyoneTabClicked',this.handle_everyoneFeedClicked,this);
	
	
};

$p.initFaceBookBtnUI = function(id){
	art.view.socialFeed.initFaceBookBtnUI(id);// moved to a file that will be loaded when JVML is parsing
};

$p.setTabClick = function(index, onloadbool) {
	var obj = art.commands.socialFeed.getScoialStoreObject();
	obj.tabSelectedIndex = index;
	obj.onLoad = onloadbool;
	art.commands.socialFeed.setScoialStoreObject(obj);
};


$p.handle_followingFeedClicked = function(accountId,args) {
	if (!args) args = {};
	this.setTabClick(0, false);
	// if not logged in to Gigya, show login prompt and hide social feed. else, do the opposite
	art.model.socialFeed.setUserFeedParameter(DemoCore.constants.USERSCOPE_USER,
			  DemoCore.constants.RECORDCOUNT,
			  DemoCore.constants.TIMESTAMP,
			  DemoCore.constants.TIMESTAMP_START,
        accountId
			  );

	try {
		//art.model.socialFeed.getUserFeedParam.accountId = art.model.socialFeed.currentFollowedUser.account.accountId;
	} catch(e) {
		error('community > socialFeedModule.js > could not set current followed user ID for feed call. Expect errors.');
		error(e);
	}
	

	art.model.socialFeed.feedData = [];
	art.view('feedDR').update();
	//art.model.socialFeed.state.update({feedDataShown:false});

	if(!DemoCore.isLoggedIn()) {
		if($("#connectFBBtnLoginFollowing").html() == "" || $("#connectFBBtnLoginFollowing").html() == " "){
			this.initFaceBookBtnUI("connectFBBtnLoginFollowing");
		}	
		$('.YourFeedLoginScreenContainerFollowing').show();
		art.commands.socialFeed.hideFollowing();
		$('#feedDR').hide();
		$('#feedMoreContainer').hide();
		//art.model.socialFeed.state.update({feedDataShown:false,feedDataEmpty:true});
		$('#socialFeedModule').attr('showFeed','false');
	} 
	else
	{
		if(art.model.socialFeed.profileInfo.following&&art.model.socialFeed.profileInfo.following.length > 0){

			var followUsed = localStorage.getItem('community_followUsed')=='true';
			if (followUsed) {
				// if user has ever clicked a follower in the left strip, show feed normally
				$('#feedDR').show();
				$('#followingMessageContainer2').hide();
				//art.view('followingDR').reset();
				art.commands.socialFeed.showFollowing();
				art.model.socialFeed.dal.feedGet({onComplete:function() {
					if ( !args.doNotRefresh_followingDR ) art.view('followingDR').update();
					//art.view('followingDR').reset();
					//art.model.socialFeed.state.update({feedDataShown:true,feedDataPopulated:true});
				}});
				$('#socialFeedModule').attr('showFeed','true');
				$('#socialFeedModule').attr('hideCFU','false');
			} else {
				// if user has never clicked a follower in the left strip, do not show feed, but show explanatory message
				$('#feedDR').hide();
				art.commands.socialFeed.showFollowing();
				$('#followingMessageContainer2').show();
				$('#socialFeedModule').attr('hideCFU','true');
				if ( !args.doNotRefresh_followingDR ) art.view('followingDR').update();
				//art.view('followingDR').reset();
			}

		}
		else {
			//art.model.socialFeed.state.update({feedDataShown:false});
			$('.YourFeedLoginScreenContainerFollowing').hide();
			art.commands.socialFeed.hideFollowing();
			$('#feedDR').hide();
			$('#feedMoreContainer').hide();
			$("#followingMessageContainer").show();
			$('#socialFeedModule').attr('showFeed','false');
		}
	}

 	//art.commands.socialFeed.setState('following');
	//	art.view.update();
	art.commands.socialFeed.clearFeedMessage();
	//art.view('followingDR').reset();

	$('#infiniteScrollAnchor').removeClass('show');
	$('#infiniteScrollAnchor').addClass('hide');

	localStorage.setItem('community_currentTab',0);
	$('#feedMoreButton').hide();
};

$p.showFollowing = function() {
	$('#followingDR').show();
	$(".leftContainer").show();
	$(".followingRightContainer").show();
	$(".rightContainer").addClass('feedFollowingWidth');
	$('.YourFeedLoginScreenContainerFollowing').hide();	
	$('.noUser .feedIR_user').hide();
	$("#followingMessageContainer").hide();
	$("#friendsMessageContainer").hide();
};

$p.hideFollowing = function() {
	$('#feedDR .feedIR_user').show();
	$('#followingDR').hide();
	$(".leftContainer").hide();
	$(".followingRightContainer").hide();
	$(".rightContainer").removeClass('feedFollowingWidth');
	$("#followingMessageContainer").hide();
	$("#friendsMessageContainer").hide();
	$('#followingMessageContainer2').hide();
};

$p.handle_friendsFeedClicked = function() {
	this.setTabClick(1,false);
	art.model.socialFeed.setUserFeedParameter(DemoCore.constants.USERSCOPE_FRIENDS,
			  DemoCore.constants.RECORDCOUNT,
			  DemoCore.constants.TIMESTAMP,
			  DemoCore.constants.TIMESTAMP_START
			  );

	art.model.socialFeed.feedData = [];
	art.view('feedDR').update();
	//art.model.socialFeed.state.update({feedDataShown:false});

	art.commands.socialFeed.hideFollowing();
	// if not logged in to Gigya, show login prompt and hide social feed. else, do the opposite
	
	if(!DemoCore.isLoggedIn()) {
		$(".screenContentFriends").text(DemoCore.getString("Connect using facebook to see your friends' activity on art.com."))
		if($("#connectFBBtnLoginFriends").html() == "" || $("#connectFBBtnLoginFriends").html() == " "){
			this.initFaceBookBtnUI("connectFBBtnLoginFriends");
		}
		$('#feedDR').hide();
		//art.model.socialFeed.state.update({feedDataShown:false});
		$('.YourFeedLoginScreenContainerFriends').show();
		$('#feedMoreContainer').hide();
		//art.model.socialFeed.state.update({feedDataShown:false,feedDataEmpty:true});
		$('#socialFeedModule').attr('showFeed','false');
	} else {
				
		//$('#feedDR').hide();
		//art.model.socialFeed.state.update({feedDataShown:false});
		$('.YourFeedLoginScreenContainerFriends').hide();
		$("#friendsMessageContainer").hide();
		art.model.socialFeed.dal.feedGet({onComplete:function() {
			if(art.model.socialFeed.feedData.length  > 0){
				//$('#feedDR').show();
				//art.model.socialFeed.state.update({feedDataShown:true,feedDataEmpty:false});
				$('#socialFeedModule').attr('showFeed','true');
			}
			else {
				$('#feedMoreContainer').hide();
				$("#friendsMessageContainer").show();
				$('#noMoreItems').removeClass('show');
				$('#noMoreItems').addClass('hide');
				$('#socialFeedModule').attr('showFeed','false');
			}
		}});
	}
	
	//art.commands.socialFeed.setState('friends');
	//	art.view.update();
	art.commands.socialFeed.clearFeedMessage();

	$('#infiniteScrollAnchor').removeClass('show');
	$('#infiniteScrollAnchor').addClass('hide');

	localStorage.setItem('community_currentTab',1);
	$('#feedMoreButton').hide();
};
$p.handle_featuredFeedClicked = function() {
	this.setTabClick(2, false);
	art.model.socialFeed.setUserFeedParameter(DemoCore.constants.USERSCOPE_FEATURED,
											  DemoCore.constants.RECORDCOUNT,
											  DemoCore.constants.TIMESTAMP,
											  DemoCore.constants.TIMESTAMP_START
											  );

	art.model.socialFeed.feedData = [];
	art.view('feedDR').update();
	//art.model.socialFeed.state.update({feedDataShown:false});

	art.commands.socialFeed.hideFollowing();
	art.model.socialFeed.dal.feedGet({onComplete:function() {
		//art.model.socialFeed.state.update({feedDataShown:true,feedDataPopulated:true});
	}});
	// art.view('feedDR').update();
	// art.commands.socialFeed.updateImages();
		$('#feedDR').show();
		$('#socialFeedModule').attr('showFeed','true');
		
	
  //art.commands.socialFeed.setState('featured');
	art.commands.socialFeed.clearFeedMessage();

	$('#infiniteScrollAnchor').removeClass('show');
	$('#infiniteScrollAnchor').addClass('hide');

	localStorage.setItem('community_currentTab',2);
	$('#feedMoreButton').hide();
};


$p.handle_everyoneFeedClicked = function() {
	this.setTabClick(3, false);
	
	art.commands.socialFeed.hideFollowing();
	art.model.socialFeed.dal.feedGet({onComplete:function() {
		//art.model.socialFeed.state.update({feedDataShown:true,feedDataPopulated:true});
	}});
			
	art.commands.socialFeed.clearFeedMessage();

	localStorage.setItem('community_currentTab',3);
	$('#feedMoreButton').hide();
};
$p.handle_Already_LogIn = function() {
	var loginoption = com.art.core.components.LoginModal.LOGIN;
    var note = new com.art.core.utils.Note(
											MyGalleriesCore.events.SHOW_GLOBAL_LOGINMODAL,
											{
											    loginOption: loginoption
											}, { modulename: "GlobalHeader" });
    MyGalleriesCore.sendNotification(note);
};

$p.handle_Register_LogIn = function() {
	var loginoption = com.art.core.components.LoginModal.REGISTER;
    var note = new com.art.core.utils.Note(
											MyGalleriesCore.events.SHOW_GLOBAL_LOGINMODAL,
											{
											    loginOption: loginoption
											}, { modulename: "GlobalHeader" });
    MyGalleriesCore.sendNotification(note);
};

$p.getTarget = function()
{
    return this.data.target;
};
$p.registerEvents = function()
{
};
$p.listNotificationInterests = function()
{
    return [];
};
$p.handleNotification = function(note)
{
    switch(note.name)
    {
    }
};
$p.getTemplate = function()
{
    return this.template
    .replace(/\$ID/g, this.NAME);
};

$p.template = "";

$p._pollInterval = null;
$p.startMonitoring = function() {
	var _this = this;

	var defaultIntervalLength = 10000;

	function interval() {
		pollService();

		_this._pollInterval = window.setTimeout(interval,_this._intervalLength);
	}
	window.clearTimeout(this._pollInterval);

	this._intervalLength = defaultIntervalLength;
	this._pollInterval = window.setTimeout(interval,this._intervalLength);

	function pollService() {
		//if (!art.model.socialFeed.state.feedDataPopulated || !art.model.socialFeed.state.feedDataShown) return;

		info('community > socialFeedModule.js > polling service for feed updates. interval was: '+_this._intervalLength+'ms');

		function successHandler(response) {
			if (!response||!response.FeedItemData) {
				error('gigya > socialFeedModule.js > polling failed. response is not in the right format. response to follow.');
				error(response);
				return;
			}

			var feedItemCount = response.FeedItemData.FeedItemCount;
			var nextTimeStamp = response.FeedItemData.NextTimeStamp;

			if (feedItemCount>0) {
				$('#feedMoreButton').show();
				$('#scrollToTop').show();
			} else {
				$('#scrollToTop').hide();
				$('#feedMoreButton').hide();
			}
			
			var str;
			if (feedItemCount==1) {str = DemoCore.getString('see 1 new activity'); if(MyGalleriesCore.getModel().environment.customerZoneId == "25") str = "voir 1 nouvelle activite";}
			else if (feedItemCount==5) str = DemoCore.getString('see 5 or more new activities');
			else str = DemoCore.getString('see') + " " +feedItemCount+ " " + DemoCore.getString('new activities');
			$('#scrollToTop_txt').html(str);

			$('#scrollToTop').attr('count',feedItemCount);

			// performance tuning
			if (feedItemCount>4) {
				// if 5 items have been found, there is no further possible UI impact of further polling, so just halt.
				info('community > socialFeedModule.js > because feedItemCount>4, halting further polling.');
				window.clearTimeout(_this._pollInterval);
			}

		}
		var ts = art.model.socialFeed._endTimeStamp;
		//info('gigya>socialFeedModule > using end time stamp: '+ts);
		art.model.socialFeed.dal.feedGet({
			successHandler:successHandler,
			beginTimeStamp:ts,
			poll:true
		});
	}

	$('#scrollToTop').hide();

	// performance tuning: gradually lengthen polling interval unless the user is active
	window.setInterval(function() {
		_this._intervalLength += 1000;
		verbose('community > socialFeedModule.js > lengthening interval by 1000 ms. interval is now: '+_this._intervalLength);
	},2000);
	/*$(document).on('mousemove',function() {
		_this._intervalLength = defaultIntervalLength;
	});*/
};

