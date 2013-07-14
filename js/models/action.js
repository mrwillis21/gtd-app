define([
	"underscore",
	"backbone"],
	function(_, Backbone) {
		return Backbone.Model.extend({
			defaults: {
				text: "",
				complete: false,
				rank: 0
			}
		});
	}
);