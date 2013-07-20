define([
	"jquery",
	"jquery-ui",
	"underscore",
	"backbone",
	"collections/actions",
	"views/inbox/action"],
	function($, jqUI, _, Backbone, Actions, ActionView) {
		return Backbone.View.extend({
			initialize: function() {
				_.bindAll(this, "render");
				this.collection.on("add remove", this.render);
			},
			render: function() {
				this.$el.html("");

				var actions = this.collection;
				this.$el.sortable({
					update: function(e, ui) {
						var listIds = $(this).sortable("toArray");
						_.each(listIds, function(listId, index) {
							actions.get(listId).save({"rank": index});
						});
					}
				});

				var actionView;
				_.each(this.collection.models, function(action){
					actionView = new ActionView({id: action.id, model: action});
					this.$el.append(actionView.render().$el);
				}, this);
				return this;
			}
		});
	}
);