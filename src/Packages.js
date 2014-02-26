if (typeof(com)=='undefined' || typeof(com.art)=='undefined') {
	if (typeof(console)!='undefined')
		console.error('Demo Application > packages.js > FATAL ERROR: com or com.art is not defined. Likely, Core is not loaded. Application will probably not working. Compensating anyway...');
	if (typeof(com)=='undefined') com = {};
	if (typeof(com.art)=='undefined') com.art = {};
}

com.art.demo = {};
com.art.demo.modules = {};
com.art.demo.proxies = {};
com.art.demo.components = {};
com.art.demo.commands = {};
com.art.demo.vos = {};
com.art.demo.model = {};

if (!art) art = {};
if (!art.model) art.model = {};
if (!art.model.socialFeed) art.model.socialFeed = {};
if (!art.commands) art.commands = {};
if (!art.commands.socialFeed) art.commands.socialFeed = {};
if (!art.commands.socialFeed.data) art.commands.socialFeed.data = {};
if (!art.view) art.view = {};
if (!art.view.socialFeed) art.view.socialFeed = {};
if (!art.utils) art.utils = {};
if (!art.utils.socialFeed) art.utils.socialFeed = {};


