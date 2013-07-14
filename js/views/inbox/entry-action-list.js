define([
	"jquery",
	"underscore",
	"backbone",
	"models/action",
	"text!/templates/inbox/entry-action-list.html"],
	function($, _, Backbone, Action, actionsTemplate) {
		return Backbone.View.extend({
			initialize: function() {
				_.bindAll(this, "render");
				this.collection.on("add remove", this.render);
			},
			events: {
				"click #entry-action-list #action-add": "addAction"
			},
			render: function() {
				var compiledTemplate = _.template(actionsTemplate, this.collection);
				this.$el.html(compiledTemplate);
				return this;
			},
			addAction: function() {
				var inputBox = $("#entry-action-list #action-input");
				var inputText = inputBox.val();
				if(inputText) {
					inputBox.val("");
					var action = new Action({text: inputText});
					this.collection.add(action);
				}
			},
			checkAction: function() {
				// TODO: Implement a new view for entry-action, and add click toggle for checkbox.
				// var checked = actionChecked.is(":checked");
			}
		});
	}
);