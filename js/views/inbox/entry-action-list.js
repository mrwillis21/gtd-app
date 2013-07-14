define([
	"jquery",
	"underscore",
	"backbone",
	"text!/templates/inbox/entry-action-list.html"],
	function($, _, Backbone, actionsTemplate) {
		return Backbone.View.extend({
			initialize: function() {
				_.bindAll(this, "render");
				this.collection.on("add remove", this.render);
			},
			render: function() {
				var compiledTemplate = _.template(actionsTemplate, this.collection);
				this.$el.html(compiledTemplate);
				return this;
			}
		});
	}
);