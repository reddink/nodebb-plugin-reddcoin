"use strict";

var db = require('./nodebb').db;

module.exports = function(Plugin) {
	// filter:user.settings
	Plugin.addUserSettings = function(settings, callback) {
		// todo: use settings.tpl instead
		settings.push({
			title: "Reddcoin Tip Settings",
			content: "<label>Reddcoin Address</label><input type='text' data-property='address' placeholder='e.g RnrvzUnhxxbaYwqivWcis7fJeCLhkZCyQ7' class='form-control' />"
		});

		callback(null, settings);
	};

	// filter:user.getSettings
	Plugin.getUserSettings = function(data, callback) {
			console.log(' Gett Settings', data);
			db.getObjectField('user:' + data.uid + ':settings', 'nodebb-plugin-reddcoin:address', function(err, title) {
			if (err) {
				callback(err);
			}	
			data.settings.address = title;
			callback(null, data);
		});	
	};
	
	// action:user.saveSettings
	Plugin.saveUserSettings = function(data) {
		console.log(' Save Settings');

		if (data.uid) {
			console.log(' Somethign to Save', data.uid);
			
			

			if (data.settings.address) {
			console.log(' Somethign to Save', data.settings.address);
			db.setObjectField('user:' + data.uid + ':settings', 'nodebb-plugin-reddcoin:address', data.settings.address);
			}else{
			// else field empty
			console.log(' Somethign to Save empty', data.settings.address);
			db.setObjectField('user:' + data.uid + ':settings', 'nodebb-plugin-reddcoin:address', '');		
			}
			console.log('Delete Address');
			db.delete('user:1:settings:account');

		}
	};
};
