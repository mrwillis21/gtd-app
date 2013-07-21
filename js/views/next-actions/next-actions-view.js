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
			render: function() {
				this.$el.html(nextActionsViewTemplate);
				var nextActions = this.getNextActions();
				_.each(nextActions, function(action) {
					this.$el.append("<li>" + action.get("text") + "</li>");
				}, this);
			},
			getNextActions: function() {
				// This complicated in-memory query will be replaced by proper backend calls, but for now...
				var nextActions = [];

				var allActions = new ActionCollection();
				allActions.fetch();

				var incompleteActions = allActions.where({"complete": false});
				function groupActionsByEntry(a) {
					return a.get("entryId");
				}
				var actionGroups = _.groupBy(incompleteActions, groupActionsByEntry);

				var sortedActions;
				var actionsForEntry;
				function sortActions(a) {
					return a.get("rank");
				}
				function populateNextActionForEntry(entry) {
					actionsForEntry = actionGroups[entry.id];
					if(actionsForEntry) {
						sortedActions = _.sortBy(actionsForEntry, sortActions);
						nextActions.push(sortedActions[0]);
					}
				}

				var allEntries = new EntryCollection();
				allEntries.fetch();

				allEntries.each(populateNextActionForEntry);

				return nextActions;
			}
		});
	}
);