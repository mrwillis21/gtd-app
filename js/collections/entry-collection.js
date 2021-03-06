define([
	"underscore",
	"backbone",
	"backbone-localstorage",
	"models/entry-model"],
	function(_, Backbone, bbls, Entry) {
		var Entries = Backbone.Collection.extend({
			model: Entry,
			localStorage: new Backbone.LocalStorage("GTD_Entries"),
			comparator: function(entry) {
				return entry.get("created");
			}
		});

		return Entries;
	}
);