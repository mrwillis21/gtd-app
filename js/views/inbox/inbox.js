define([
	"jquery",
	"underscore",
	"backbone",
	"models/entry",
	"collections/entries",
	"views/inbox/entry-list",
	"text!/templates/inbox/inbox.html"],
	function($, _, Backbone, Entry, Entries, ListView, inboxTemplate) {
		return Backbone.View.extend({
			el: $("#app"),
			initialize: function() {
				this.entries = new Entries(); // Load this from elsewhere once persistence is built.
			},
			events: {
				"click #inbox #entry-add": "addItem"
			},
			render: function() {
				this.$el.html(inboxTemplate);
				new ListView({
					el: $("#entries"),
					collection: this.entries
				}).render();
				return this;
			},
			addItem: function() {
				var inputBox = $("#inbox #entry-input");
				var inputText = inputBox.val();
				if(inputText) {
					inputBox.val("");
					var entry = new Entry({text: inputText});
					this.entries.add(entry); // Make this toggle-able - desc/asc
				}
			}
		});
	}
);