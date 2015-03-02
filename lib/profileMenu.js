"use strict";

module.exports = function(Plugin) {
	// filter:user.profileLinks
	Plugin.addUserProfileLinks = function(header, callback) {
		// todo: use settings.tpl instead

		header = header.concat(
			[
				{
					id: 'tipping_history',
					route: 'history',
					icon: 'fa fa-history',
					name: "Tipping History",
					public: true
				}
			]
		);

		callback(null, header);
	};
};
