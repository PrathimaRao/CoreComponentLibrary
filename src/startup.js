var socialGA = {};
$(document).ready(function () {
  
    //Register Module Command
    //DemoCore.registerModule(new com.art.demo.modules.socialFeedModule({target:"#SocialLeft"},core));
    //DemoCore.registerModule(new com.art.social.modules.profileModule({target:"body"},SocialCore));

    //DemoCore.startModule(com.art.social.modules.socialFeedModule.NAME);
    //DemoCore.startModule(com.art.social.modules.profileModule.NAME);     

    //Register Module Command
    DemoCore.registerModule(new com.art.demo.modules.socialFeedModule({ target: "" }, DemoCore));
    DemoCore.startModule(com.art.demo.modules.socialFeedModule.NAME);

    $art.jvml.tagFinder.method = 'tagName';
    $art.jvml.parseDocument();

    //art.model.socialFeed.feedData = [];
    art.view('feedDR').update();
});

