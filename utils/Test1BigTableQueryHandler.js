const format = require('string-format')

class Test1BigTableQueryHandler{
    constructor(){
        console.log('init Test1BigTableQueryHandler')
    }

    select(wine, i){
        // return format("select name{7}, year{8}, grapes{9}, country{10}, region{11}, description{12}, picture{13} \
        //                 from wine_test_1 \
        //                 where name0 = '{0}' and year1 = {1} and grapes2 = '{2}' and country3 = '{3}' and region4 = '{4}' and description0 = '{5}' \
        //                     and picture1 = '{6}'",
        //                 wine.name, wine.year, wine.grapes, wine.country, wine.region, wine.description, wine.picture, 
        //                 (i % 5), ((i + 1) % 5),((i + 2) % 5),((i + 3) % 5),((i + 4) % 5),((i + 5) % 5),((i + 6) % 5)
        //             )

        var selectQuery = 'select '
        var fromQuery = 'from wine_test_1 '
        var whereQuery = 'where '

        for (var key in wine){
            selectQuery = selectQuery + ' ' + key + ', '
            whereQuery = whereQuery + ' ' + key + ' = ' + wine[key] + ' and '
        }

        selectQuery = selectQuery.slice(0, -2)
        whereQuery = whereQuery.slice(0, -5)

        var query = selectQuery + fromQuery + whereQuery

        return query

    }

    insert(wine){
        return format("insert into wine_test_1\
                        (\
                            name0, year0, grapes0, country0, region0, description0, picture0,\
                            name1, year1, grapes1, country1, region1, description1, picture1,\
                            name2, year2, grapes2, country2, region2, description2, picture2,\
                            name3, year3, grapes3, country3, region3, description3, picture3,\
                            name4, year4, grapes4, country4, region4, description4, picture4\
                        ) \
                        values \
                        (\
                            '{0}', {1}, '{2}', '{3}', '{4}', '{5}', '{6}',\
                            '{0}', {1}, '{2}', '{3}', '{4}', '{5}', '{6}',\
                            '{0}', {1}, '{2}', '{3}', '{4}', '{5}', '{6}',\
                            '{0}', {1}, '{2}', '{3}', '{4}', '{5}', '{6}',\
                            '{0}', {1}, '{2}', '{3}', '{4}', '{5}', '{6}'\
                        )", 
                        wine.name, wine.year, wine.grapes, wine.country, wine.region, wine.description, wine.picture
                    )
    }

    update(filterWine, updatWine, i){
        return format("update wine_test_1\
                        set name{14} = '{0}', year{15} = {1}, grapes{16} = '{2}', country{17} = '{3}', region{18} = '{4}', description{19} = '{5}', picture{20} = '{6}' \
                        where name{14} = '{7}' and year{15} = {8} and grapes{16} = '{9}' and country{17} = '{10}' and region{18} = '{11}' and description{19} = '{12}' and picture{20} ='{13}'", 
                        updatWine.name,updatWine.year, updatWine.grapes, updatWine.country, updatWine.region, updatWine.description, updatWine.picture,
                        filterWine.name,filterWine.year, filterWine.grapes, filterWine.country, filterWine.region, filterWine.description, filterWine.picture,
                        (i % 5), ((i + 1) % 5),((i + 2) % 5),((i + 3) % 5),((i + 4) % 5),((i + 5) % 5),((i + 6) % 5)
                    )
    }
}

module.exports = Test1BigTableQueryHandler