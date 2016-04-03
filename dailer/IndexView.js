define(["backbone","jquery","underscore","text!./html/index.html"],
	function(Backbone,$,_,html){
		"use strict";
		var Model = Backbone.Model.extend({
			defaults:{
				number : "000",
				name : "unknown",
				id : "unknown"
			}
		})

		var Collection = Backbone.Collection.extend({
			model : Model
		})

		var IndexView =  Backbone.View.extend({
			template: _.template(html),
			el : "#subview",
			initialize: function(){							
				this.$el.html(this.template({items:this.collection.toJSON()}));
			}

		})
		return {
			run : function(){
				var collection = new Collection();	
				new IndexView({collection: collection})
			}
		}
		
	})