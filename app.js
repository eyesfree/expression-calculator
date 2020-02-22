var express = require('express');
var app = express();
var math = require('mathjs-expression-parser');
var helmet = require('helmet');
var port = process.env.PORT || 3939;  
var i18n = require('i18n');

i18n.configure({
  locales: ['en', 'bg', 'de', 'fi'],
  cookie: 'language',
  directory: __dirname + '/locales'
});

app.disable('x-powered-by');
app.use(helmet());
app.use(i18n.init);

app.get('/calculus', (req,res) => {

    if(req.query.query) {
        var result = calculateBase64(req.query.query);
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

function calculateBase64(userInput) {
    var input = Buffer.from(userInput, 'base64');
    var decoded = input.toString();

    if(decoded) {
        try {
            var result = math.eval(decoded);
            return result;       
        }
        catch (err) {
            return err;
        }
    } else {
        return res.__('invalid_input');
    }
}

module.exports = app
