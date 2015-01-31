"use strict";

var db = require('./nodebb').db;

module.exports = function(Plugin) {
	// filter:user.settings
	Plugin.addUserSettings = function(settings, callback) {
		// todo: use settings.tpl instead
		settings.push({
			title: "Redd Kitchen Sink",
			content: "<label>Sample user setting</label><input type='text' data-property='userTitle' placeholder='Lorem Dimsum' class='form-control' />"
		});

		callback(null, settings);
	};

	// filter:user.getSettings
	Plugin.getUserSettings = function(data, callback) {
		db.getObjectField('user:' + data.uid + ':settings', 'userTitle', function(err, title) {
			if (err) {
				callback(err);
			}	
			data.settings.userTitle = title;
			callback(null, data);
		});	
	};
	
	// action:user.saveSettings
	Plugin.saveUserSettings = function(data) {
		if (data.uid && data.userTitle) {
			db.setObjectField('user:' + data.uid + ':settings', 'userTitle', data.userTitle);
		}
	};
};
