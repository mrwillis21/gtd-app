define([
	"jquery",
	"underscore",
	"backbone",
	"models/action",
	"views/inbox/action",
	"text!/templates/inbox/entry-action-list.html"],
	function($, _, Backbone, Action, ActionView, actionsTemplate) {
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

				var actionListEl = $("#entry-actions");
				var actionView;
				_.each(this.collection.models, function(action){
					actionView = new ActionView({model: action});
					actionListEl.append(actionView.render().el);
				});
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
			}
		});
	}
);