var test1BigTableQueryHandler = require('../utils/Test1BigTableQueryHandler')
var randomUtil = require('../utils/randomUtil')

class Wine {

    constructor(queryHandler){
        this.queryHandler = queryHandler
    }

    find(req, res) {

        var wine = req.body;

        req.getConnection(function(err,connection){

            var random = randomUtil.random(1,5)

            console.log('random: ' + random)

            var queryString = global.queryHandler.select(wine, random)

            console.log(queryString)
    
            var query = connection.query(queryString,function(err,rows)
            {
    
                if(err)
                    console.log("Error Selecting : %s ",err );
    
                res.send(rows);
    
    
            });
        });
    };

    addWine(req, res) {
        var wine = req.body;
        delete wine._id;
        console.log('Adding wine: ' + JSON.stringify(wine));
    
        req.getConnection(function (err, connection) {
    
            var queryString = global.queryHandler.insert(wine)

            console.log(queryString)

            try {
                var query = connection.query(queryString, function (err, rows) {
    
                    if (err)
                        console.log("Error inserting : %s ", err);
    
                    res.send(rows);
    
                });
            }
            catch (error){
                console.log(error);
            }
    
        });
    }

    updateWine(req, res) {

        var id = req.params.id;
        var wines = req.body;
    
        req.getConnection(function (err, connection) {

            var random = randomUtil.random(1,5)

            var queryString = global.queryHandler.update(wines[0], wines[1], random)

            console.log(queryString)
    
            connection.query(queryString, function(err, rows)
            {
    
                if (err)
                    console.log("Error Updating : %s ",err );
    
                res.send(rows);
    
            });
    
        });
    }
};

module.exports = Wine