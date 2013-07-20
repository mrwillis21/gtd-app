define([
	"jquery",
	"underscore",
	"backbone",
	"collections/actions",
	"views/inbox/action"],
	function($, _, Backbone, Actions, ActionView) {
		return Backbone.View.extend({
			initialize: function() {
				_.bindAll(this, "render");
				this.collection.on("add remove", this.render);
			},
			render: function() {
				this.$el.html("");
				var actionView;
				_.each(this.collection.models, function(action){
					actionView = new ActionView({model: action});
					this.$el.append(actionView.render().$el);
				}, this);
				return this;
			}
		});
	}
);