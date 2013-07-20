define([
	"jquery",
	"underscore",
	"backbone",
	"collections/entries",
	"views/inbox/entry-list",
	"text!/templates/inbox/inbox.html"],
	function($, _, Backbone, Entries, ListView, inboxTemplate) {
		return Backbone.View.extend({
			el: $("#app"),
			initialize: function() {
				this.$el.html(inboxTemplate);
				this.inputBox = this.$("#entry-input");
				this.entries = new Entries();
				this.entries.fetch();
				new ListView({
					el: $("#entries"),
					collection: this.entries
				}).render();
			},
			events: {
				"click #inbox #entry-add": "addItem",
				"submit": "addItem"
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