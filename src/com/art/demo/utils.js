art.utils.socialFeed.generateUniqueId = function() {
	return guid();
	
	function s4() {
	  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	};

	function guid() {
	  //return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		return s4()+'-'+s4();
	};
};

art.utils.socialFeed.inviteFriends = function() {
	
};

art.utils.socialFeed.followBtnDisplay = function(accid) {
	if (isNullOrEmpty(accid)) {
		error('gigya > followBtnDisplay > error: account id not provided.');
		return 'none !important';
	}
	var t = "block";
	
	if(SocialCore.isLoggedIn()) {
		if (isNullOrEmpty(art.model.socialFeed.profileInfo)) return 'block';
		var data = art.model.socialFeed.profileInfo.following;
		if (!data||!data.push) {
			warn('gigya > utils > followingBtnDisplay > profile info not ready; cannot determine status of following button. (when profileInfo comes in, feed should update)');
			return 'none !important';
		}
		for (var i = 0; i < data.length; i++){
			if (!data[i].account||!data[i].account.accountId) {
				error('gigya > utils > followBtnDisplay > data error; followed user missing account ID. data item to follow.');
				info(data[i]);
			}
			if (data[i].account.accountId==accid) {
				t = "none !important;";
			}
		}
	}
	
	var cookieobject = new com.art.core.cookie.Cookie();
	if(cookieobject.getCookieDictionary('ap','accountid') == accid)
		t = "none !important;";
	
	return t;
	
};
art.utils.socialFeed.followingBtnDisplay = function(accid){
	if (isNullOrEmpty(accid)) {
		error('gigya > followBtnDisplay > error: account id not provided.');
		return 'none !important';
	}
	var t = "none !important;", f=false;
	
	if(SocialCore.isLoggedIn()) {
	
		var data = art.model.socialFeed.profileInfo.following;
		if (!data||!data.push) {
			warn('gigya > utils > followingBtnDisplay > profile info not ready; cannot determine status of following button. (when profileInfo comes in, feed should update)');
			return 'none !important';
		}
		for (var i = 0; i < data.length; i++){
			if (!data[i].account||!data[i].account.accountId) {
				error('gigya > utils > followBtnDisplay > data error; followed user missing account ID. data item to follow.');
				info(data[i]);
			}
			if (data[i].account.accountId==accid) {
				t = "block !important;";
				f = true;
			}
		}
	}
	var cookieobject = new com.art.core.cookie.Cookie();
	if(cookieobject.getCookieDictionary('ap','accountid') == accid && !f)
		t = "none !important;";
	
	return t;
};

art.utils.socialFeed.getAccountId = function() {
	var cookieobject = new com.art.core.cookie.Cookie();
	return cookieobject.getCookieDictionary('ap','accountid');
};

art.utils.socialFeed.showFeaturedLabel = function(isfeatured) {
	var t = "none";
	
	var obj = art.commands.socialFeed.getScoialStoreObject();
	var tc;
	if(obj){
		tc = obj.tabSelectedIndex;
	}
	if(isfeatured && tc != 2)
		t = "block !important;";
	return t;
};
art.utils.socialFeed.showFeaturedLabelStar = function(isfeatured) {
	var t = "none";
	if(isfeatured)
		t = "block !important;";
	return t;
};


art.utils.socialFeed.showInviteButton = function(){
	var t = "block";
	if(isiOSDevice())
		t = "none !important;";
	return t;
};

/*
art.utils.socialFeed.monitor = function(args) {
	return;
	if (!args) args = {};
	
	if (art.model.socialFeed.monitorData) art.model.socialFeed.monitorData = [];
	if (art.model.socialFeed.monitorColor) art.model.socialFeed.monitorColor = 'gray';

	var data = art.model.socialFeed.monitorData;

	var updated = false;
	if (typeof(args.service)=='object' {
		for (var i = 0; i < data.length; i++) {
			if (data[i].name==args.service.name) {
				data[i] == args.service;
				updated = true;
				break;
			}
		}
	}
	if (!updated) data.push(args.service);



	var r = false, y = false, c;
	for (var i = 0; i < data.length; i++) {
		if(data[i].color=='yellow') y = true;
		if(data[i].color=='red') r = true;
	}
	if (r) c = 'red';
	else if (y) c = 'yellow';
	else c = 'green';

	art.model.socialFeed.monitorColor = c;

	art.view('monitor').update();
};
*/