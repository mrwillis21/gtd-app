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
				var allActions = new Actions();
				allActions.fetch();
				var id = this.model.id;

				// FIXME: Filtering in memory sucks, but this will get fixed once I switch to a proper backend.
				this.actions = new Actions(allActions.where({entryId: id}));
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
				var parentId = this.model.id;
				if(inputText) {
					this.actions.create({entryId: parentId, text: inputText, rank: this.actions.length});
					this.inputBox.val("").focus();
				}
			}
		});
	}
);