(function(module) {
	"use strict";

	var Plugin = {};
	

	// static:app.load
	Plugin.init = function(params, callback) {
		var app = params.router,
			middleware = params.middleware,
			controllers = params.controllers;
			
		require('./lib/customRoutes')(app, middleware, controllers);
		require('./lib/adminPage')(app, middleware, controllers);
		callback();
	};


	require('./lib/nodebb');
	require('./lib/userSettings')(Plugin);
	require('./lib/menuItems')(Plugin);
//	require('./lib/clientScripts')(Plugin);
	require('./lib/profileMenu')(Plugin);

// routing for tipping history
/*
	Plugin.changeClientRouting = function (config, callback){
		config.custom_mapping['^user/[.^\/]*history'] = 'account/history';
		callback(null, config);
	}
*/

	module.exports = Plugin;
}(module));
