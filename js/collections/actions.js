define([
	"underscore",
	"backbone",
	"models/entry"],
	function(_, Backbone, Entry) {
		return Backbone.Collection.extend({
			model: Entry
		});
	}
);