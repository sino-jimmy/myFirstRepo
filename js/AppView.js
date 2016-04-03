define(["backbone","jquery"],function(Backbone,$){
	"use strict";	
	var AppView = Backbone.View.extend({
		el: "#app",
		loadApp: function(appName){
			var self = this;
			require(["../" + appName + "/IndexView"],function(IndexView){				
				IndexView.run();
			})
		}
	});
	return new AppView();
});