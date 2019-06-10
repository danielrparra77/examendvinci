//https://redstapler.co/chromeless-automation-tutorial/
//https://www.npmjs.com/package/google-search-results-nodejs
//https://github.com/nextapps-de/flexsearch

const GOOGLESEARCH_KEY = Symbol.for("My.App.examen1.GoogleSearch");
const { Chromeless } = require('chromeless');

// check if the global object has this symbol
// add it if it does not have the symbol, yet
// ------------------------------------------

var globalSymbols = Object.getOwnPropertySymbols(global);
var hasSolid = (globalSymbols.indexOf(GOOGLESEARCH_KEY) > -1);

if (!hasSolid){
  global[GOOGLESEARCH_KEY] = {
    googleSearch: "GoogleSearch"
  };
}


var GoogleSearch = function(param){
	if (param){
		//if(typeof param.height === "undefined")
		//	param.height = HEIGHT;	
	}
	var self = param;

	self.setQuery = function(searchingParams,_callback){

		async function run() {
		  const chromeless = new Chromeless()
		  const textxs = await chromeless
		    .goto('https://www.google.com')
		    .type(searchingParams, 'input[name="q"]')
		    .press(13)
		    .wait('.jfp3ef')
		   	.evaluate(() => {
		   		var retorno = [];

		   		var allQuerys = document.querySelectorAll('.ZINbbc');
		   		allQuerys.forEach(function(query) {
		   			const link = query.querySelector("a");
					const textos = [].map.call(query.querySelectorAll('.jfp3ef div.BNeawe'),
				        div => ({ title: div.innerText, link: link.href })
				    );
				    retorno = retorno.concat(textos);
				});


		      /*const textos = [].map.call(document.querySelectorAll('.jfp3ef div.BNeawe'),
		        div => ({ title: div.innerText, div: div })
		      );*/
		      //return JSON.stringify(retorno);
		      return retorno;
		    });

		  //console.log(textxs) // prints local file path or S3 url
		  _callback(textxs);
		  await chromeless.end()
		}
		 run().catch(console.error.bind(console))

	}

	return self;
};

Object.defineProperty(GoogleSearch, "instance", {
  get: function(){
    return global[GOOGLESEARCH_KEY];
  }
});


// ensure the API is never changed
// -------------------------------

Object.freeze(GoogleSearch);

// export the singleton API only
// -----------------------------


module.exports = GoogleSearch;