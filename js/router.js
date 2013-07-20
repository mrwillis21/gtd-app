define([
	"jquery",
	"underscore",
	"backbone",
	"views/inbox/inbox-view"],
	function($, _, Backbone, InboxView) {
		var AppRouter = Backbone.Router.extend({
			routes: {
				"": "showInbox",
				"inbox": "showInbox",
				"next-actions": "showNextActions"
			},

			showInbox: function() {
				new InboxView().render();
			},

			showNextActions: function() {
				console.log("Next Actions");
			}
		});

		var initialize = function() {
			var appRouter = new AppRouter();
			Backbone.history.start();
		};

		return  {
			initialize: initialize
		};
	}
);