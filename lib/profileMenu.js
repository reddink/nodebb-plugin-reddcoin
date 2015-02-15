"use strict";

module.exports = function(Plugin) {
	// filter:user.profileLinks
	Plugin.addUserProfileLinks = function(header, callback) {
		// todo: use settings.tpl instead

		header = header.concat(
			[
				{
					route: 'history',
					icon: 'fa fa-history',
					name: "Reddcoin Tipping History"
				}
			]
		);

		callback(null, header);



/*
	// filter:header.build
	Plugin.addNavigation = function(header, callback) {
		header.navigation = header.navigation.concat(
			[
				{
					route: '/demo',
					class: '',
					icon: 'fa fa-clock-o',
					text: "Reddcoin Tipping"
				}
			]
		);

		callback(null, header);
	};
*/
	};
};
