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
				for(var i = 0; i < this.collection.length; i++) {
					entry = this.collection.at(i);
					entryView = new EntryView({ model: entry });
					this.$el.append(entryView.render().el);
				}
				return this;
			}
		});
	}
);