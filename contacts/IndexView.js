define(["jquery","underscore","backbone","text!./html/index.html"],
	function($,_,Backbone,html){
		//"use strict";
		var Model = Backbone.Model.extend({
			// defaults:{
			// 	number : "000",
			// 	name : "unknown",
			// 	id : "unknown"
			// },
			url:"contacts/data.json"

		})

		var Collection = Backbone.Collection.extend({
			model : Model,
			url:"contacts/data.json"
		})

		var IndexView =  Backbone.View.extend({
			template: _.template(html),
			el : "#subview",
			initialize: function(){				
				var self = this;
				// this.model.fetch({
				// 	success:function(data){
				// 		var  item= data.attributes
				// 		var arr = []
				// 		for(var p in item){
				// 			arr.push(item[p]);
				// 		}
				// 		self.$el.html(self.template({items:item}));
				// 		self.model.set({"title":"mobile"})
				// 	},
				// 	error: function(){
				// 	}
				// })
				console.log(this.collection);
				self.$el.html(self.template({items:this.collection.models}))
				this.listenTo(this.collection,"change",this.render);
				this.listenTo(this.collection,"add",this.render);		
				this.listenTo(this.collection,"remove",this.render);	
				this.listenTo(this.collection,"reset",this.render);							
			},
			events : {
				"click .js-edit" : "edit",
				"click .js-ok" :"editOk",
				"click .js-delete" : "delete",
				"click #addContact" : "addContact",
				"click #addConfirmed":"addConfirmed"
			},
			edit: function(e){
				$(e.target).parent().addClass("dsn")
				$(e.target).parent().next().removeClass("dsn");
			},
			editOk:function(e){
				var number = $(e.target).siblings("input[name=number]").val();
				var name = $(e.target).siblings("input[name=name]").val();
				var id = $(e.target).attr("id");
				var model = this.collection.get(id);
				model.set({
					name:name,
					number:number
				}) 
				$(e.target).parent().addClass("dsn")
				$(e.target).parent().prev().removeClass("dsn");
			},
			delete:function(e){
				var id = $(e.target).attr("id");
				this.collection.remove(id);
			},
			addContact:function(e){
				$(e.target).next().removeClass("dsn");				
			},
			addConfirmed:function(e){
				var number = $("#addNumber").val();
				var name = $("#addName").val();
				if(!number || !name){
					return;
				}
				var model = new Model({
					name:name,
					number:number,
					id:this.collection.models.length+1
				})
				this.collection.add(model);
				$(e.target).parent().addClass("dsn")
			},
			render: function(){
				this.$el.html(this.template({items:this.collection.models}));
				return;
			}

		})
		return {
			run : function(){
				var collection = new Collection();
				var model = new Model();
				collection.add(new Model({"number":001, "name" : "abby1", "id":1}));
				collection.add(new Model({"number":002, "name" : "abby2", "id":2}));
				collection.add(new Model({"number":003, "name" : "abby3", "id":3}));
				new IndexView({collection: collection})
			}
		}
		
	})