define([
	"underscore",
	"backbone"],
	function(_, Backbone) {
		return Backbone.Model.extend({
			defaults: {
				text: "",
				complete: false,
				context: "",
				rank: 0,
				entryId: ""
			},

			getContext: function() {
				var ret;
				var c = this.get("context");
				if(c) {
					ret = "";
					if(c.charAt(0) != "@") {
						ret = "@";
					}
					ret += c;
				}
				return ret;
			}
		});
	}
);