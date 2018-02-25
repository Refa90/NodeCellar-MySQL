var express = require('express'),
    path = require('path'),
    http = require('http'),
    wine = require('./routes/wines');

var connection  = require('express-myconnection');
var mysql = require('mysql');

var app = express();


var conn =  connection(mysql,{

    host: '193.106.55.134',
    user: 'root',
    password : 'root',
    port :3306 , //port mysql
    database:'winecellar'

},'pool');//or single

app.use(conn);

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);
app.get('/wines/:year', wine.findByYear);
app.get('/wines/:country', wine.findByCountry);


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});



/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
