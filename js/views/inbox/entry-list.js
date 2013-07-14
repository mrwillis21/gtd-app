define([
	"jquery",
	"underscore",
	"backbone",
	"models/entry",
	"collections/entries",
	"views/inbox/entry"],
	function($, _, Backbone, Entry, Entries, EntryView) {
		return Backbone.View.extend({
			initialize: function() {
				_.bindAll(this, "render");
				this.collection.on("add remove", this.render);
			},
			render: function() {
				this.$el.html("");
				var entryView, entry;
				_.each(this.collection.models, function(entry) {
					entryView = new EntryView({ model: entry });
					this.$el.append(entryView.render().el);
				}, this);
				return this;
			}
		});
	}
);