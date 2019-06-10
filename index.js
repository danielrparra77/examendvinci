const express = require('express')
const app = express();

const GS = require(__dirname + '/modules/googleSearch/googleSearch.js');
googleSearch = GS({});

const DL = require(__dirname + '/modules/googleSearch/dataLooking.js');
dataLooking = DL({});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');

  googleSearch.setQuery('bin laden',function(result){
  		console.log(dataLooking.lookingMatches(result,'terror'));
  });

});