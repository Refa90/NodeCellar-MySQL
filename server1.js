var express = require('express'),
    path = require('path'),
    http = require('http'),
    wine = require('./routes/wine')

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

var queryHandler;
var queryHandlerModule;
// switch(process.argv[2]){
//     case "1":
//         queryHandlerModule = require('./utils/Test1BigTableQueryHandler.js');
//         break;
//     case "2":
//         queryHandlerModule = require('./utils/Test1SmallTableQueryHandler.js');
//         break;
//     case "3":
//         queryHandlerModule = require('./utils/Test2BigTableQueryHandler.js');
//         break;
//     case "4":
//         queryHandlerModule = require('./utils/Test2SmallTablesQueryHandler.js');
//         break;
// }

queryHandlerModule = require('./utils/Test1BigTableQueryHandler.js');
queryHandler = new queryHandlerModule()
var wineObject = new wine(queryHandler)

app.use(queryHandler)
global.queryHandler = queryHandler

app.configure(function () {
    app.set('port', 3001);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

// app.get('/wines', wineObject.findAll);
// app.get('/wines/:id', wineObject.findById);
app.post('/getwines/', wineObject.find/*, queryHandler*/);
app.post('/wines', wineObject.addWine);
app.put('/wines', wineObject.updateWine);
//app.delete('/wines/:id',wineObject.deleteWine);
// app.get('/wines/findbyear/:year', wineObject.findByYear);
// app.get('/wines/findbycountry/:country', wineObject.findByCountry);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});



/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
