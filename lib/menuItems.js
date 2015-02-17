"use strict";

module.exports = function(Plugin) {

	// filter:admin.header.build
	Plugin.addAdminNavigation = function(header, callback) {
		header.plugins.push({
			route: '/reddcoin-admin',
			icon: 'fa-tint',
			name: 'Reddcoin Tipping'
		});

		callback(null, header);
	};
};
