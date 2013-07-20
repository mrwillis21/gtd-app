define([
	"underscore",
	"backbone",
	"models/action"],
	function(_, Backbone, Action) {
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