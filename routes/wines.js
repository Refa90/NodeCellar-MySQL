
var db;

exports.findById = function(req, res) {
    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM wine WHERE id = ?',[id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            rows.map((curRow)=> {curRow.description = curRow.description.toString('utf8')});

            res.send(rows[0]);


        });

        //console.log(query.sql);
    });
};

exports.findAll = function(req, res) {

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM wine',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            rows.map((curRow)=> {curRow.description = curRow.description.toString('utf8')});

            res.send(rows);


        });

        //console.log(query.sql);
    });
};

exports.addWine = function(req, res) {
    var wine = req.body;
    delete wine._id;
    console.log('Adding wine: ' + JSON.stringify(wine));

    req.getConnection(function (err, connection) {


        try {
            var query = connection.query("INSERT INTO wine set ? ", wine, function (err, rows) {

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

exports.updateWine = function(req, res) {

    var id = req.params.id;
    var wine = req.body;



    req.getConnection(function (err, connection) {


        connection.query("UPDATE wine set ? WHERE id = ? ",[wine,id], function(err, rows)
        {

            if (err)
                console.log("Error Updating : %s ",err );

            res.send(rows);

        });

    });

    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));

}

exports.deleteWine = function(req, res) {
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM wine  WHERE id = ? ",[id], function(err, rows)
        {

            if(err)
                console.log("Error deleting : %s ",err );

            res.redirect('/customers');

        });

    });
}

exports.findByYear = function(req, res) {
    var year = req.params.year;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM wine WHERE year = ?',[year],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            rows.map((curRow)=> {curRow.description = curRow.description.toString('utf8')});

            res.send(rows[0]);


        });

        //console.log(query.sql);
    });
};

exports.findByCountry = function(req, res) {
    var country = req.params.country;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM wine WHERE country = ?',[country],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            rows.map((curRow)=> {curRow.description = curRow.description.toString('utf8')});

            res.send(rows[0]);
        });

        //console.log(query.sql);
    });
};