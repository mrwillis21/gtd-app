define([
	"jquery",
	"underscore",
	"backbone",
	"collections/entry-collection",
	"collections/action-collection",
	"text!/templates/next-actions/next-actions-view-tpl.html"],
	function($, _, Backbone, EntryCollection, ActionCollection, nextActionsViewTemplate) {
		return Backbone.View.extend({
			el: $("#app"),
			initialize: function() {
				var actions = new ActionCollection();
				actions.fetch();

				var entries = new EntryCollection();
				entries.fetch();

				this.actions = new ActionCollection(this.getNextActions(entries, actions));
			},
			render: function() {
				this.$el.html(nextActionsViewTemplate);
				_.each(this.actions.models, function(action) {
					this.$el.append("<li>" + action.get("text") + "</li>");
				}, this);
			},
			getNextActions: function(allEntries, allActions) {
				// This complicated in-memory query will be replaced by proper backend calls, but for now...
				var incompleteActions = allActions.where({"complete": false});

				function groupActionsByEntry(a) {
					return a.get("entryId");
				}
				var actionGroups = _.groupBy(incompleteActions, groupActionsByEntry);

				function sortActions(a) {
					return a.get("rank");
				}
				var sortedActions;
				var nextActions = [];
				function populateNextActionForEntry(entry) {
					if(actionGroups[entry.id]) {
						sortedActions = _.sortBy(actionGroups[entry.id], sortActions);
						nextActions.push(sortedActions[0]);
					}
				}

				allEntries.each(populateNextActionForEntry);

				return nextActions;
			}
		});
	}
);