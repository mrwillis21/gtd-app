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
				this.model.on("change", function() {
					var span = this.$el.find("span");
					(this.model.get("complete")) ? span.addClass("complete") : span.removeClass("complete");
					// TODO: Move to the bottom of the list.
				}, this);
			},
			events: {
				"click .action-check": "checkAction"
			},
			render: function() {
				var compiledTemplate = _.template(actionTemplate, this.model.toJSON());
				this.$el.html(compiledTemplate);
				return this;
			},
			checkAction: function(e) {
				var checked = $(e.target).is(":checked");
				this.model.set("complete", checked);
			}
		});
	}
);