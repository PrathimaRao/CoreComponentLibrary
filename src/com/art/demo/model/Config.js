com.art.demo.model.Config = function(args) {
	var _this = this; 
	
	if (!args) args = {};

	this.apiKey = args.apiKey;
	this.appId = args.appId;
	this.authToken = args.authToken;
	this.sessionId = args.sessionId;	
	this.accountID = args.accountID;
	this.anonymous = args.anonymous;
	
	if (!args.serviceUrls) args.serviceUrls = {};
	this.serviceUrls = {
		accountAuthorization: args.serviceUrls.accountAuthorization || '',
		eCommerce: args.serviceUrls.eCommerceAPI || '',
		graphService: args.serviceUrls.graphService || '',
		galleryService: args.serviceUrls.galleryAPIService || ''
	};
	this.services = {
		base: new com.art.core.services.ServiceProvider( { 
			serviceUrlAccountAuthenticationApi: _this.serviceUrls.accountAuthorization,
			serviceUrlEcommerceApi: _this.serviceUrls.eCommerce,
			graphAPIServiceUrl: _this.serviceUrls.graphService,
			galleryServiceUrl: _this.serviceUrls.galleryService
		} )
	};
	this.services.accountAuthorization = this.services.base.accountAuthorizationAPIService;
	this.services.eCommerceAPI = this.services.base.ecommerceAPIService;
	this.services.graphService = this.services.base.graphServiceAPI;
	this.services.galleryService = this.services.base.galleryAPIService;
};

var $c = com.art.demo.model.Config;

$c.getConfigFromServer = function() {
    // not used in this app, setting it localling in calling function
    // but can pass the arguments from .net
   /*var args = {
	    apiKey: "519BAAC8E607413CA1FC043C92D08AAD",
	    appId: "86627B368CCE4AB5AEF60B710BE521C1",
	    authToken: "139243a682c941f7a749bbc9cf5d40e3",
	    sessionId: "73B06E3A8B284450954709868F89FAE1",
	    accountID: "258827158",
		anonymous: true,
		serviceUrls: {
		    accountAuthorization: "https://qa1-api.art.com/AccountAuthorizationAPI.svc",
		    eCommerceAPI: "http://qa1-api.art.com/EcommerceAPI.svc",
		    graphService: "http://qa1-ws-graph.art.com/GraphService.svc",
			galleryAPIService: "http://qa1-ws-gallery.art.com/GalleryService.svc"
		}
	};
	return new com.art.demo.model.Config(args);*/
};
