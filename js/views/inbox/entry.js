define([
	"jquery",
	"bootstrap",
	"underscore",
	"backbone",
	"collections/actions",
	"views/inbox/entry-action-list",
	"text!/templates/inbox/entry.html",
	"text!/templates/inbox/entry-modal.html"],
	function($, Bootstrap, _, Backbone, Actions, ActionListView, entryTemplate, modalTemplate) {
		return Backbone.View.extend({
			tagName: "li",
			className: "ui-entry",
			events: {
				"click": "openItem"
			},
			initialize: function() {
				_.bindAll(this, "render");

				this.actions = new Actions(); // Load this from elsewhere once persistence is built.

				this.jqModal = $(_.template(modalTemplate, this.model.toJSON()));
				this.jqModalBody = this.jqModal.find(".modal-body");
			},
			render: function() {
				var compiledTemplate = _.template(entryTemplate, this.model.toJSON());
				this.$el.html(compiledTemplate);
				return this;
			},
			openItem: function() {
				var modal = this.jqModal;
				var modalBodyEl = this.jqModalBody;

				var actionView = new ActionListView({el: modalBodyEl, collection: this.actions});
				actionView.render();

				modal.on('hidden', function() {
					modal.remove();
				});

				modal.modal();
			}
		});
	}
);