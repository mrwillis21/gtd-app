define([
	"underscore",
	"backbone"],
	function(_, Backbone) {
		var Entry = Backbone.Model.extend({
			defaults: {
				text: "",
				listId: ""
			}
		});

		return Entry;
	}
);