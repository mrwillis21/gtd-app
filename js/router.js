define([
	"jquery",
	"underscore",
	"backbone",
	"views/inbox/inbox-view",
	"views/next-actions/next-actions-view"],
	function($, _, Backbone, InboxView, NextActionsView) {
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
				new NextActionsView().render();
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