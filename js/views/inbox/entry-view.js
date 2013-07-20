define([
	"jquery",
	"bootstrap",
	"underscore",
	"backbone",
	"views/inbox/entry-modal-view",
	"text!/templates/inbox/entry-view-tpl.html",
	"text!/templates/inbox/entry-modal-view-tpl.html"],
	function($, Bootstrap, _, Backbone, EntryModalView, entryViewTemplate, entryModalViewTemplate) {
		return Backbone.View.extend({
			tagName: "li",
			className: "ui-entry",
			events: {
				"click": "openItem"
			},
			initialize: function() {
				_.bindAll(this, "render");
				this.jqModal = $(_.template(entryModalViewTemplate, this.model.toJSON()));
				this.inputBox = this.jqModal.find("#action-input");
				this.jqModalBody = this.jqModal.find(".modal-body");
			},
			render: function() {
				var compiledTemplate = _.template(entryViewTemplate, this.model.toJSON());
				this.$el.html(compiledTemplate);
				return this;
			},
			openItem: function() {
				var self = this;

				new EntryModalView({ el: self.jqModalBody, model: self.model }).render();

				var modal = self.jqModal;
				modal.on('hidden', function() {
					modal.remove();
				});
				modal.modal();
			}
		});
	}
);