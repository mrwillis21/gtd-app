define([
	"jquery",
	"bootstrap",
	"underscore",
	"backbone",
	"collections/actions",
	"views/inbox/action-modal-view",
	"text!/templates/inbox/entry.html",
	"text!/templates/inbox/entry-modal.html"],
	function($, Bootstrap, _, Backbone, Actions, ActionModalView, entryTemplate, modalTemplate) {
		return Backbone.View.extend({
			tagName: "li",
			className: "ui-entry",
			events: {
				"click": "openItem"
			},
			initialize: function() {
				_.bindAll(this, "render");
				this.jqModal = $(_.template(modalTemplate, this.model.toJSON()));
				this.inputBox = this.jqModal.find("#action-input");
				this.jqModalBody = this.jqModal.find(".modal-body");
			},
			render: function() {
				var compiledTemplate = _.template(entryTemplate, this.model.toJSON());
				this.$el.html(compiledTemplate);
				return this;
			},
			openItem: function() {
				var self = this;

				new ActionModalView({ el: self.jqModalBody, model: self.model }).render();

				var modal = self.jqModal;
				modal.on('hidden', function() {
					modal.remove();
				});
				modal.modal();
			}
		});
	}
);