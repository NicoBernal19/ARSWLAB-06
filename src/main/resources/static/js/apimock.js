//@author hcadavid

apimock=(function(){

    var mockdata=[];

    mockdata["johnconnor"]=
        [{author:"johnconnor","points":[{ "x": 200, "y": 50},{ "x": 100, "y": 250},{ "x": 300, "y": 250},{ "x": 200, "y": 50}],"name":"triangle"},
        {author:"johnconnor","points":[{ "x": 200, "y": 50 },{ "x": 300, "y": 125 },{ "x": 275, "y": 225 },{ "x": 125, "y": 225 },{ "x": 100, "y": 125 },{ "x": 200, "y": 50 }],"name":"pentagon"}];
    mockdata["maryweyland"]=
        [{author:"maryweyland","points":[{ "x": 200, "y": 50 },{ "x": 100, "y": 250 },{ "x": 300, "y": 250 },{ "x": 200, "y": 50 }],"name":"triangulo"},
        {author:"maryweyland","points":[{ "x": 100, "y": 200 },{ "x": 300, "y": 200 },{ "x": 300, "y": 100 },{ "x": 250, "y": 50 },{ "x": 200, "y": 50 },{ "x": 150, "y": 50 },{ "x": 100, "y": 100 },{ "x": 100, "y": 200 }],"name":"casa"}];


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