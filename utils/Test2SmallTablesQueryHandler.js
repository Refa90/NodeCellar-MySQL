class Test2SmallTablesQueryHandler{
    constructor(){
        console.log('init Test2SmallTablesQueryHandler')
    }

    select(wine, i){

        return format("select t1.name, t2.year, t2.grapes, t3.country, t3.region, t4.description, t4.picture \
                        from wine_test_21 as t1\
                             inner join wine_test_22 as t2\
                                on t1.id = t2.id\
                             inner join wine_test_23 as t3\
                                on t2.id = t3.id\
                             inner join wine_test_24 as t4\
                                on t3.id = t4.id\
                        where t1.name = '{0}' and t2.year = {1} and t2.grapes = '{2}' and t3.country = '{3}' and t3.region = '{4}' and t4.description = '{5}' \
                            and t4.picture = '{6}'",
                        wine.name, wine.year, wine.grapes, wine.country, wine.region, wine.description, wine.picture
                    )
    }

    insert(wine){
        return format("insert into wine_test_21 (name) \
                        values ('{0}')\
                        \
                        insert into wine_test_22(year, grapes) values({1}, '{2}')\
                        \
                        insert into wine_test_23(country, regoin) values('{3}', '{4}')\
                        \
                        insert into wine_test_24(description, picture) values('{5}', '{6}')", 
                        wine.name, wine.year, wine.grapes, wine.country, wine.region, wine.description, wine.picture
                    )
    }

    update(filterWine, updatWine, i){
        return format("update wine_test_21\
                        set name = '{0}' where name = '{7}'\
                        \
                        update wine_test_22\
                        set year = {1}, grapes = '{2}' where year = {8} and grapes = '{9}'\
                        \
                        update wine_test_23\
                        set country = '{3}', region = '{4}' where country = '{10}' and region = '{11}'\
                        \
                        update wine_test_24\
                        set description = '{5}', picture = '{6}' where description = '{12}' and picture ='{13}'",
                        updatWine.name,updatWine.year, updatWine.grapes, updatWine.country, updatWine.region, updatWine.description, updatWine.picture,
                        filterWine.name,filterWine.year, filterWine.grapes, filterWine.country, filterWine.region, filterWine.description, filterWine.picture
                    )
    }
}

module.exports = Test1BigTableQueryHandler