const format = require('string-format')

class Test1SmallTableQueryHandler{
    constructor(){
        console.log('init Test1SmallTableQueryHandler')
    }

    select(wine, i){
        // return format("select name0, year0, grapes0, country0, region0, description0, picture0 \
        //                 from wine_test_11 \
        //                 where name0 = '{0}' and year1 = {1} and grapes2 = '{2}' and country3 = '{3}' and region4 = '{4}' and description0 = '{5}' \
        //                     and picture1 = '{6}'",
        //                 wine.name, wine.year, wine.grapes, wine.country, wine.region, wine.description, wine.picture
        //             )

        var selectQuery = 'select '
        var fromQuery = 'from '

        if(Object.keys(wine).length > 7){
            fromQuery = fromQuery + 'wine_test_1_v '
        }else{
            fromQuery = fromQuery + 'wine_test_11 '   
        }

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
        return format("insert into wine_test_11\
                        (\
                            name0, year0, grapes0, country0, region0, description0, picture0\
                        ) \
                        values \
                        (\
                            '{0}', {1}, '{2}', '{3}', '{4}', '{5}', '{6}'\
                        )", 
                        wine.name, wine.year, wine.grapes, wine.country, wine.region, wine.description, wine.picture
                    )
    }

    update(filterWine, updatWine, i){
        return format("update wine_test_11\
                        set name0 = '{0}', year0 = {1}, grapes0 = '{2}', country0 = '{3}', region0 = '{4}', description0 = '{5}', picture0 = '{6}' \
                        where name0 = '{7}' and year0 = {8} and grapes0 = '{9}' and country0 = '{10}' and region0 = '{11}' and description0 = '{12}' and picture0 = '{13}'", 
                        updatWine.name,updatWine.year, updatWine.grapes, updatWine.country, updatWine.region, updatWine.description, updatWine.picture,
                        filterWine.name,filterWine.year, filterWine.grapes, filterWine.country, filterWine.region, filterWine.description, filterWine.picture
                    )
    }
}

module.exports = Test1SmallTableQueryHandler