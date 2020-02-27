var express = require('express');
var app = express();
var math = require('mathjs-expression-parser');
var helmet = require('helmet');
var port = process.env.PORT || 3939;  
var i18n = require('i18n');

var pino = require('express-pino-logger')()

i18n.configure({
  locales: ['en', 'bg', 'de', 'fi'],
  cookie: 'language',
  directory: __dirname + '/locales'
});
app.use(i18n.init);

app.disable('x-powered-by');
app.use(helmet());
app.use(pino)

app.get('/calculus', (req,res) => {
    req.log.info("Calculation started");
    if(req.query.query) {
        var decoded = decodeBase64(req.query.query);
        var result = calculate(decoded);
        if(isNaN(result)) {          
            res.status(400).send({ error: 'true', message: res.__('error_calc') + result });
            res.log.info({ error: 'true', message: res.__('error_calc') + result });
        } else {
            res.send({ error: 'false', result: `${result}` });  
            res.log.info({ error: 'false', result: `${result}` });
        }     
    } else {       
        res.status(400).send({ error: 'true', message: res.__('no_input') });
        res.log.info({ error: 'true', message: res.__('no_input') });
    }
});

app.listen(port);


/**
 * Decodes a base64 string
 * @param {string} userInput a base64 decoded utf-8 string
 */
function decodeBase64(userInput) {
    var input = Buffer.from(userInput, 'base64');
    if (input) {
        return input.toString();
    }
}

/**
 * Calculates a mathematical expression if a syntactically valid input is given, otherwise returns an error. 
 * @param {string} input mathematical expression for example 2+3*4-(5*3)
 */
function calculate(input) {
    if (input) {
        try {
            var result = math.eval(input);
            return result;       
        }
        catch (err) {
            return err;
        }
    } else {
        return i18n.__('invalid_input');
    }
}

// used by aws lambda
module.exports = app
