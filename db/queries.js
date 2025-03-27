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
async function getMoves(dance, livello){
    let first = true
    let query = `SELECT passo, passi.passo_id, livello FROM balli JOIN passi ON balli.id = ballo_id`
    query +=  ` WHERE ballo LIKE '${dance}'`
   
   
   query += `ORDER BY livello DESC`

    const {rows} = await pool.query(query)
return rows
}
async function getLevelMoves(dance, livello){
    let first = true
    let query = `SELECT passo, passi.passo_id, livello FROM balli JOIN passi ON balli.id = ballo_id`
    query +=  ` WHERE ballo LIKE '${dance}'`
   query += `AND livello LIKE '${livello}'`
   
   query += `ORDER BY livello DESC`

    const {rows} = await pool.query(query)
return rows
}

async function getVariations(dances){

    let query =`SELECT variazione, variazioni.passo_id FROM passi JOIN 
variazioni ON passi.passo_id = variazioni.passo_id JOIN balli ON balli.id = passi.ballo_id
`

if(typeof dances === 'string'){
    query +=  ` WHERE ballo LIKE '${dances}'`
} 

const {rows} = await pool.query(query)
return rows
}
async function getLevels(dances){

    let query =`SELECT DISTINCT passi.passo_id, livello FROM balli JOIN passi ON id=passi.ballo_id
`

if(typeof dances === 'string'){
    query +=  ` WHERE ballo LIKE '${dances}'`
}

query += `ORDER BY livello`

const {rows} = await pool.query(query)
return rows
}

async function getDances(){
    const {rows} = await pool.query(`SELECT ballo FROM balli WHERE scelto IS true;`)
    return rows
}



module.exports ={
    getEverything,
    getDances,
    getVariations,
    getMoves,
    getLevels,
    getLevelMoves
}
