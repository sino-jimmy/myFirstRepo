requirejs.config({
	baseUrl: "js",
	paths: {
		"jquery" : "../common/jquery-1.11.3.min",
		"underscore" : "../common/underscore",
		"backbone" : "../common/backbone",
		"text" : "../common/text-requirejs"
	}
})
require(["router"],function(router){
	router.run();
})