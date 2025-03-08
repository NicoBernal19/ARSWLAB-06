//@author hcadavid

apimock=(function(){

    var mockdata=[];

    mockdata["johnconnor"]=
        [{author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
        {author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"},
        {author:"johnconnor","points":[{"x":400,"y":270},{"x":150,"y":215}],"name":"kitchen"},
        {author:"johnconnor","points":[{"x":250,"y":175},{"x":150,"y":200}],"name":"bedroom"},
        {author:"johnconnor","points":[{"x":440,"y":340},{"x":155,"y":250}],"name":"gear"}];
    mockdata["maryweyland"]=
        [{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
        {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"},
        {author:"maryweyland","points":[{"x":400,"y":270},{"x":150,"y":215}],"name":"kitchen2"},
        {author:"maryweyland","points":[{"x":250,"y":175},{"x":150,"y":200}],"name":"bedroom2"},
        {author:"maryweyland","points":[{"x":440,"y":340},{"x":155,"y":250}],"name":"gear2"}];


    return {
        getBlueprintsByAuthor:function(authname,callback){
            callback(
                mockdata[authname]
            );
        },

        getBlueprintsByNameAndAuthor:function(authname,bpname,callback){

            callback(
                mockdata[authname].find(function(e){return e.name===bpname})
            );
        }
    }

})();

/*
Example of use:
var fun=function(list){
	console.info(list);
}

apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/