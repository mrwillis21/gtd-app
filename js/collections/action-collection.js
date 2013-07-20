define([
	"underscore",
	"backbone",
	"backbone-localstorage",
	"models/action-model"],
	function(_, Backbone, bbls, Action) {
		var Actions = Backbone.Collection.extend({
			model: Action,
			localStorage: new Backbone.LocalStorage("GTD_Actions"),
			comparator: function(action) {
				return action.get("rank");
			}
		});

		return Actions;
	}
);