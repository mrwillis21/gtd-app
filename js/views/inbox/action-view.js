define([
	"jquery",
	"bootstrap",
	"underscore",
	"backbone",
	"text!/templates/inbox/action-view-tpl.html"],
	function($, Bootstrap, _, Backbone, actionViewTemplate) {
		return Backbone.View.extend({
			tagName: "li",
			className: "ui-action",
			initialize: function() {
				_.bindAll(this, "render");
				this.model.on("change", this.render);
			},
			events: {
				"click .action-check": "toggleComplete"
			},
			render: function() {
				var compiledTemplate = _.template(actionViewTemplate, this.model);
				this.$el.html(compiledTemplate);
				var complete = this.model.get("complete");
				this.$(".action-text").toggleClass("complete", complete);
				this.$(".action-check").prop("checked", complete);
				return this;
			},
			toggleComplete: function(e) {
				var checked = $(e.target).is(":checked");
				this.model.save({"complete": checked});
			}
		});
	}
);