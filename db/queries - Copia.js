const pool = require('./pool');

async function getEverything(dances){
    let first = true
    let query = `SELECT ballo, passo, livello, variazione FROM balli JOIN passi ON balli.id = ballo_id LEFT JOIN 
variazioni ON passi.passo_id = variazioni.passo_id`

    if(typeof dances === 'string'){
        query +=  ` WHERE ballo LIKE '${dances}'`
    } else {
        dances.forEach(dance =>{
            if(first){
           query += ` WHERE ballo LIKE '${dance}'`
            first = false
            } else {
               query += ` OR ballo LIKE '${dance}'`
            }
        })
    }
     


   
   query += `ORDER BY ballo`

    const {rows} = await pool.query(query)
return rows
}

async function getVariations(){

    let query =`SELECT passo, variazione from passi JOIN 
variazioni on passi.passo_id = variazioni.passo_id WHERE passi.passo_id = 7
`
}

async function getDances(){
    const {rows} = await pool.query(`SELECT ballo FROM balli WHERE scelto IS true;`)
    return rows
}

module.exports ={
    getEverything,
    getDances
}
