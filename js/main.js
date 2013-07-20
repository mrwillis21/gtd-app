require.config({
	baseUrl: "js/",
	paths: {
		"jquery": "lib/jquery-2.0.3.min",
		"jquery-ui": "lib/jquery-ui",
		"underscore": "lib/underscore-min",
		"backbone": "lib/backbone-min",
		"backbone-localstorage": "lib/backbone.localStorage-min",
		"bootstrap": "lib/bootstrap"
	},
	shim: {
		"jquery-ui": {
			deps: ["jquery"]
		},
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		"underscore": {
			exports: '_'
		}
	}
});

require(['app'], function(App) {
	App.initialize();
});

