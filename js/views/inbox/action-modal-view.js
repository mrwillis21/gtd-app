define([
	"jquery",
	"underscore",
	"backbone",
	"collections/actions",
	"views/inbox/entry-action-list"],
	function($, _, Backbone, Actions, ActionListView) {
		return Backbone.View.extend({
			initialize: function() {
				this.inputBox = this.$("#action-form #action-input");
				this.actions = new Actions();
				// this.actions.fetch();
			},
			events: {
				"click #action-form #action-add": "addAction",
				"submit #action-form": "addAction"
			},
			render: function() {
				var listEl = this.$("#entry-actions");
				new ActionListView({
					el: listEl,
					collection: this.actions
				}).render();
			},
			addAction: function(e) {
				e.preventDefault();
				var inputText = this.inputBox.val();
				if(inputText) {
					this.actions.create({text: inputText, rank: this.actions.length});
					this.inputBox.val("").focus();
				}
			}
		});
	}
);