const DATALOOKING_KEY = Symbol.for("My.App.examen1.DataLooking");
const LIMITCOUNTING = 3;
// check if the global object has this symbol
// add it if it does not have the symbol, yet
// ------------------------------------------

var globalSymbols = Object.getOwnPropertySymbols(global);
var hasSolid = (globalSymbols.indexOf(DATALOOKING_KEY) > -1);

if (!hasSolid){
  global[DATALOOKING_KEY] = {
    dataLooking: "DataLooking"
  };
}


var DataLooking = function(param){
	if (param){
		//if(typeof param.height === "undefined")
		//	param.height = HEIGHT;	
	}
	var self = param;

	self.lookingMatches = function(dataSet,busqueda){
	  	console.log(dataSet);
	  	var counting = 0;
	  	var relacionadoEnBusqueda = false;
	  	var linksFound = [];
	  	dataSet.forEach(function(query) {
	  		if (query.title.includes(busqueda) && linksFound.indexOf(query.link) < 0){
	  		  	if (counting<LIMITCOUNTING)
	  		  		counting+=1;
	  		  	else
	  		  		relacionadoEnBusqueda = true;
	  		  	linksFound.push(query.link);
	  		}

	  	});
	  	return{
	  		relacionadoEnBusqueda:relacionadoEnBusqueda,
	  		linksFound:linksFound
	  	};
	}

	return self;
};

Object.defineProperty(DataLooking, "instance", {
  get: function(){
    return global[DATALOOKING_KEY];
  }
});


// ensure the API is never changed
// -------------------------------

Object.freeze(DataLooking);

// export the singleton API only
// -----------------------------


module.exports = DataLooking;