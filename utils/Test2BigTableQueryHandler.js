class Test2BigTableQueryHandler{
    constructor(){
        console.log('init Test2BigTableQueryHandler')
    }

    select(wine, i){
        // return format("select name, year, grapes, country, region, description, picture \
        //                 from wine_test_2 \
        //                 where name = '{0}' and year = {1} and grapes = '{2}' and country = '{3}' and region = '{4}' and description = '{5}' \
        //                     and picture = '{6}'",
        //                 wine.name, wine.year, wine.grapes, wine.country, wine.region, wine.description, wine.picture
        //             )

        var selectQuery = 'select '
        var fromQuery = 'from wine_test_2 '
        var whereQuery = 'where '

        for (var key in wine){
            selectQuery = selectQuery + ' ' + key + ', '
            whereQuery = whereQuery + ' ' + key + ' = ' + wine[key] + ' and '
        }

        selectQuery = selectQuery.slice(0, -1)
        whereQuery = whereQuery.slice(0, -5)

        var query = selectQuery + fromQuery + whereQuery

        return query
    }

    insert(wine){
        return format("insert into wine_test_2\
                        (\
                            name, year, grapes, country, region, description, picture\
                        ) \
                        values \
                        (\
                            '{0}', {1}, '{2}', '{3}', '{4}', '{5}', '{6}'\
                        )", 
                        wine.name, wine.year, wine.grapes, wine.country, wine.region, wine.description, wine.picture
                    )
    }

    update(filterWine, updatWine, i){
        return format("update wine_test_2\
                        set name = '{0}', year = {1}, grapes = '{2}', country = '{3}', region = '{4}', description = '{5}', picture = '{6}' \
                        where name = '{7}' and year = {8} and grapes = '{9}' and country = '{10}' and region = '{11}' and description = '{12}' and picture ='{13}'", 
                        updatWine.name,updatWine.year, updatWine.grapes, updatWine.country, updatWine.region, updatWine.description, updatWine.picture,
                        filterWine.name,filterWine.year, filterWine.grapes, filterWine.country, filterWine.region, filterWine.description, filterWine.picture
                    )
    }
}

module.exports = Test2BigTableQueryHandler