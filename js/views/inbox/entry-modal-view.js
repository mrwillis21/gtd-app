define([
	"jquery",
	"underscore",
	"backbone",
	"collections/action-collection",
	"views/inbox/action-list-view"],
	function($, _, Backbone, ActionCollection, ActionListView) {
		return Backbone.View.extend({
			initialize: function() {
				this.inputBox = this.$("#action-form #action-input");
				var allActions = new ActionCollection();
				allActions.fetch();
				var id = this.model.id;

				// FIXME: Filtering in memory sucks, but this will get fixed once I switch to a proper backend.
				this.actions = new ActionCollection(allActions.where({entryId: id}));
				this.listenTo(this.actions, "add remove change:complete", this.updateProgress, this);
			},
			events: {
				"click #action-form #action-add": "addAction",
				"submit #action-form": "addAction",
				"click #entry-operations #delete-link": "deleteEntry"
			},
			render: function() {
				var listEl = this.$("#entry-actions");
				new ActionListView({
					el: listEl,
					collection: this.actions
				}).render();
				this.updateProgress();
			},
			addAction: function(e) {
				e.preventDefault();
				var inputText = this.inputBox.val();
				var parentId = this.model.id;
				if(inputText) {
					this.actions.create({entryId: parentId, text: inputText, rank: this.actions.length});
					this.inputBox.val("").focus();
				}
			},
			updateProgress: function() {
				var pct = Math.floor((this.actions.where({complete: true}).length / this.actions.length) * 100);
				this.$(".progress .bar").width(pct + "%");
			},
			deleteEntry: function(e) {
				e.preventDefault();
				// TODO: Show a confirmation.
				var action;
				for(action = this.actions.first(); action; action = this.actions.first()) {
					action.destroy();
				}
				this.model.destroy();
				$("#entryModal").modal('hide');
			}
		});
	}
);