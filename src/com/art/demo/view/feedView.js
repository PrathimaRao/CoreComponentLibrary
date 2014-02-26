art.view.socialFeed.init = function() {
	var followUsed = localStorage.getItem('community_followUsed')=='true';
	$('#socialFeedModule').attr('followUsed',followUsed);
	this.initCarousel();

	if (art.view('followDR0')) art.view('followDR0').loading(true);
	if (art.view('followDR1')) art.view('followDR1').loading(true);
	if (art.view('followDR2')) art.view('followDR2').loading(true);

	$('.SocialContainer').attr('loggedIn',DemoCore.isLoggedIn());
};

art.view.socialFeed.getFollowText = function(item) {
	var name = item.owner.account.name.displayName();
	var count = item.follows.length;
	var url = item.owner.account.social.profileUrl;
	var text = '';
	var txtFollowed = DemoCore.getString("followed");
	if (count==1) text = txtFollowed+': ';
	else text = txtFollowed + ' '+count+' people:';

	var html = '<a href="{url}">{name}</a> {text}';
	html = html.replace( '{name}' , name );
	html = html.replace( '{url}' , url );
	html = html.replace( '{text}' , text );

	return html;
};

art.view.socialFeed.initFaceBookBtnUI = function(id) {
	var c = art.model.socialFeed.config;

	var gigyaObj = new com.art.core.utils.Gigya( c.services.base, null, null, c.apiKey, c.sessionId );
    gigyaObj.showLoginUI(id,25,230,true);
    gigyaObj.registerCallback(gigyaObj.GIGYA_LOGGED_IN,	function (response) {
    	response.success = response.artComResponse.OperationResponse.ResponseCode == 200;
		if(response.facebookResponse!=undefined && response.facebookResponse!=null){			
			var authToken=response.artComResponse.AuthenticationToken;
    		MyGalleriesCore.sendNotification(new com.art.core.utils.Note(MyGalleriesCore.events.FACEBOOK_MERGE_ACCOUNTS,{authToken:authToken},{ modulename: "GlobalHeader",logintfob:true }));
    	}
	
    });
};

art.view.socialFeed.initCarousel = function() {
	var carousel = art.view('followingDR');
	if (!carousel) {
		error('community > art.view.socialFeed.initCarousel > could not locate carousel component.');
		return;
	}

	// override default method
	carousel.enableButtons = function() {
		var lb = document.getElementById(this.id+'_leftButton');
		var rb = document.getElementById(this.id+'_rightButton');
		if (!lb) {
			warn('core > Carousel > enableButtons > failed! nothing to enable!');
			return;
		}
		var leftEnabled = this.leftIndex > 0;
		var rightEnabled;

		var fudgeFactor = 1;
		if (localStorage.getItem('community_followUsed')!='true') fudgeFactor = 0;

		if (this.orientation=='vertical') rightEnabled = this.leftIndex < (this.data.length-fudgeFactor) - this.height;
		else rightEnabled = this.leftIndex <= (this.data.length-1) - this.width;
		lb.setAttribute('data-enabled',leftEnabled);
		rb.setAttribute('data-enabled',rightEnabled);

	}
};