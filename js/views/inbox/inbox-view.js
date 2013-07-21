define([
	"jquery",
	"underscore",
	"backbone",
	"collections/entry-collection",
	"views/inbox/entry-list-view",
	"text!/templates/inbox/inbox-view-tpl.html"],
	function($, _, Backbone, EntryCollection, EntryListView, inboxViewTemplate) {
		return Backbone.View.extend({
			el: $("#app"),
			events: {
				"click #entry-form #entry-add": "addItem",
				"submit #entry-form": "addItem"
			},
			initialize: function() {
				this.entries = new EntryCollection();
				this.entries.fetch();
			},
			render: function() {
				this.$el.html(inboxViewTemplate);
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
					// TODO: Later we're going to want to let the server set the created timestamp.
					this.entries.create({text: inputText, created: new Date().getTime() }); // Make this toggle-able - desc/asc
					this.inputBox.val("").focus();
				}
			}
		});
	}
);