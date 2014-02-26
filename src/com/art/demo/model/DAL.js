art.model.socialFeed.dal = {};

var $s = art.model.socialFeed.dal;

$s.feedGet = function(args) {
	if (!args) args = {};

	//RELEASE CONFIGS
    /*	var args = {
	    apiKey: "519BAAC8E607413CA1FC043C92D08AAD",
	    appId: "86627B368CCE4AB5AEF60B710BE521C1",
	    authToken: "f68579bfe1e24be7a627ad84524414f6",
	    sessionId: "42C8E4F1F17C43E4AC9CFC01DD704D73",
	    accountID: "261843876",
	    anonymous: true,
	    serviceUrls: {
	        accountAuthorization: "https://rel1-api.art.com/AccountAuthorizationAPI.svc",
	        eCommerceAPI: "http://rel1-api.art.com/EcommerceAPI.svc",
	        graphService: "http://rel1-ws-graph.art.com/GraphService.svc",
	        galleryAPIService: "http://rel1-ws-gallery.art.com/GalleryService.svc"
	    }
	};
    */


	//PRODUCTION CONFIGS
	var args = {
	    apiKey: "519BAAC8E607413CA1FC043C92D08AAD",
	    appId: "86627B368CCE4AB5AEF60B710BE521C1",
	    authToken: "d7151a3cf93c492182cbd2d5d851a73f",
	    sessionId: "C3AF6FA3A94D4EA59837C5AA6FC1C1D3",
	    accountID: "290742979",
	    anonymous: true,
	    serviceUrls: {
	        accountAuthorization: "https://api.art.com/AccountAuthorizationAPI.svc",
	        eCommerceAPI: "http://api.art.com/EcommerceAPI.svc",
	        graphService: "http://ws-graph.art.com/GraphService.svc",
	        galleryAPIService: "http://ws-gallery.art.com/GalleryService.svc"
	    }
	};

	var c = new com.art.demo.model.Config(args);
	var _this = this;
	var sp = c.services.eCommerceAPI;

	var apiKey = c.apiKey;
	var appId = c.appId;
	var authToken = c.authToken;
	var sessionId = c.sessionId;	
	var accountID = art.model.socialFeed.getUserFeedParam.accountId;
	if (!accountID) accountID = null;
	var feedScope = art.model.socialFeed.getUserFeedParam.feedScope;
	var recordCount = 5;//art.model.socialFeed.getUserFeedParam.recordCount;
	var timeStamp = art.model.socialFeed.getUserFeedParam.timeStamp;
	var timeStampType = art.model.socialFeed.getUserFeedParam.timeStampType;
	var includeFeedItems = !args.poll;

	if (args.beginTimeStamp) {
		timeStamp = args.beginTimeStamp+1;
		//timeStampType = 0;
		timeStampType = 'RecordsAfterTimeStamp';
	}
	if (args.endTimeStamp) {
		timeStamp = args.endTimeStamp;
		//timeStampType = 1;
		timeStampType = 'RecordsBeforeTimeStamp';
	}

	var successHandler = _this.feedGet_success;
	if (args.successHandler) successHandler = args.successHandler;
	
	var callbacks = {
		successHandler: function(response) { successHandler(response,args.onComplete) },
		beforeSendHandler: function() {},
		errorHandler: function(response) {
			art.commands.socialFeed.error(DemoCore.getString('Error in GetUserFeed call. Response in console.'));
			error(response);
		}
	};

	var sargs = { apiKey:apiKey, authToken:authToken, sessionId:sessionId, accountID:accountID, feedScope:feedScope, recordCount:recordCount, timeStamp:timeStamp, timeStampType:timeStampType, includeFeedItems:includeFeedItems };
	sp.FeedGet( callbacks, sargs );
	if (!args.poll) {
		art.model.socialFeed.state.update({feedDataEmpty:false});
		$('#noMoreItems').addClass('hide');
		$('#feedError').removeClass('show');
		$('#feedError').addClass('hide');
	}
};

$s.feedGet_success = function (response, onComplete) {
    var apiReturn = response.FeedItemData.FeedItems;
    var count = 0;
    var markUpHtml = "";
    for (var i = 0; i < apiReturn.length; i++) {
        var obj = apiReturn[i];
        count++;
        markUpHtml += "<div class='innerText'> Item # " + count + " : '" + obj.Actors[0].Accounts[0].ProfileInfo.EmailAddress + "' has done some action in community" + "</div>";
        markUpHtml += "</div>";
    }
    markUpHtml += "<div>-------------------------------------------------------</div>";
    $('#FeedContentCount').append(markUpHtml);
    count = 0;

    localStorage.setItem('feedDataCache', JSON.stringify(response));
    setTimeout(function () { window['_doNotPage'] = false; }, 400);
    Controller.notify('community_resumePolling');
};

