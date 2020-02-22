var express = require('express');
var app = express();
var math = require('mathjs-expression-parser');
var port = process.env.PORT || 3939;  
var i18n = require('i18n');

i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['en', 'bg', 'de'],

  // sets a custom cookie name to parse locale settings from
  cookie: 'language',

  // where to store json files - defaults to './locales'
  directory: __dirname + '/locales'
});


// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init);


app.get('/', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

app.get('/calculate', (req,res) => {
    var lang = req.acceptsLanguages('de', 'en', 'bg', 'fn');
    if (lang) {
        console.log('Spotted supported language:' + lang);
    }

    if(req.query.input) {
        var result = calculateBase64(req.query.input);
        if(isNaN(result)) {
            res.send({ error: 'true', message: res.__('error_calc') + result });
        } else {
            res.send({ error: 'false', result: `${result}` });  
        }     
    } else {
        res.send({ error: 'true', message: res.__('no_input') });
    }
});

app.listen(port);
console.log(`String calculator running at ${port}`);

function calculateBase64(userInput) {
    console.log('Processing: ' + userInput);
    var input = new Buffer(userInput, 'base64');
    var decoded = input.toString();
    console.log('Decoded exression: ' + decoded);

    if(decoded) {
        try {
            var result = math.eval(decoded);
            console.log('Result: ' + result);
            return result;       
        }
        catch (err) {
            return err;
        }
    } else {
        return res.__('invalid_input');
    }
}

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
