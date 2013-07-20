define([
	"jquery",
	"bootstrap",
	"underscore",
	"backbone",
	"text!/templates/inbox/action.html"],
	function($, Bootstrap, _, Backbone, actionTemplate) {
		return Backbone.View.extend({
			tagName: "li",
			className: "ui-action",
			initialize: function() {
				_.bindAll(this, "render");
				this.model.on("change", function(model) {
					this.$(".action-label").toggleClass("complete", model.get("complete"));
					// TODO: Move to the bottom of the list.
				}, this);
			},
			events: {
				"click .action-check": "toggleComplete"
			},
			render: function() {
				var compiledTemplate = _.template(actionTemplate, this.model);
				this.$el.html(compiledTemplate);
				return this;
			},
			toggleComplete: function(e) {
				var checked = $(e.target).is(":checked");
				this.model.set("complete", checked);
			}
		});
	}
);