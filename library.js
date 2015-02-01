(function(module) {
	"use strict";

	var Plugin = {};
	

	/* TODO

	filter:uploadImage
	filter:widgets.getAreas
	filter:widgets.getWidgets
	filter:search.query
	filter:post.parse
	filter:messaging.parse
	filter:scripts.get
	filter:sounds.get
	filter:post.save
	filter:post.get
	filter:post.getPosts
	filter:posts.custom_profile_info
	filter:post.getFields
	filter:post.parse
	filter:uploadFile
	filter:register.check
	filter:auth.init
	filter:composer.help
	filter:topic.thread_tools
	filter:user.create
	filter:widget.render

	action:email.send
	action:plugin.deactivate
	action:plugin.activate
	action:post.save
	action:post.setField
	action:topic.edit
	action:post.edit
	action:post.delete
	action:post.restore
	action:config.set
	action:topic.save
	action:user.create
	action:post.delete
	action:topic.delete
	*/

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
//	require('./lib/menuItems')(Plugin);
	require('./lib/clientScripts')(Plugin);
	module.exports = Plugin;
}(module));
