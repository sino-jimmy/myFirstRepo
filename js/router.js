define(['jquery',"underscore","backbone","AppView"],function($,_,Backbone,AppView){
	"use strict";	
	var Router = Backbone.Router.extend({
		routes:{
			"app/:appName" : "showApp",
			"*default" : "showHome" 
		},
		showApp: function(appName){			
			var appName = appName;
			AppView.loadApp(appName);
		},
		showHome: function(){
			this.navigate("app/dailer",{trigger: true, replace: true})
		}
		
	})
	return {
		run : function(id){
			new Router();
			//appView = new AppView();
			Backbone.history.start();
		}
	}
})