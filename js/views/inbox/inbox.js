define([
	"jquery",
	"underscore",
	"backbone",
	"collections/entries",
	"views/inbox/entry-list",
	"text!/templates/inbox/inbox.html"],
	function($, _, Backbone, Entries, EntryListView, inboxTemplate) {
		return Backbone.View.extend({
			el: $("#app"),
			events: {
				"click #entry-form #entry-add": "addItem",
				"submit #entry-form": "addItem"
			},
			initialize: function() {
				this.entries = new Entries();
				this.entries.fetch();
			},
			render: function() {
				this.$el.html(inboxTemplate);
				this.inputBox = this.$("#entry-form #entry-input");
				new EntryListView({
					el: $("#entries"),
					collection: this.entries
				}).render();
			},
			addItem: function(e) {
				e.preventDefault();
				var inputText = this.inputBox.val();
				if(inputText) {
					this.entries.create({text: inputText}); // Make this toggle-able - desc/asc
					this.inputBox.val("").focus();
				}
			}
		});
	}
);