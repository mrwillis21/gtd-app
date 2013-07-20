define([
	"underscore",
	"backbone",
	"backbone-localstorage",
	"models/entry"],
	function(_, Backbone, bbLocalStorage, Entry) {
		var Entries = Backbone.Collection.extend({
			model: Entry,
			localStorage: new Backbone.LocalStorage("GTD_Entries")
			// TODO: Add a comparator to order by "rank".
		});

		return Entries;
	}
);