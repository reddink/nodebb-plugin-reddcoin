"use strict";

module.exports = function(Plugin) {

/*
	// filter:header.build
	Plugin.addNavigation = function(header, callback) {
		header.navigation = header.navigation.concat(
			[
				{
					route: '/demo',
					class: 'fa fa-fw fa-clock-o',
					title: 'Tipping History'
//					text: "Reddcoin Tipping"

				}
			]
		);

		callback(null, header);
	};
*/
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
