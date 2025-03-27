const db = require('../db/queries');

async function indexPost(req, res){


req.session.dances = req.body.dance
res.redirect('/balli')
}

async function movesPost(req,res) {
    console.log(req.body.dance)
    req.session.passi=req.body.dance
    res.redirect('/passi')
    
}

async function indexGet(req,res){
    const balli = await db.getDances();
    
    res.render('index', {balli:balli})
}
async function dancesGet(req,res){
    
   
    const balli = await db.getEverything(req.session.dances);
   
    res.render('balli', {balli: balli} )
}

async function movesGet(req, res){
    
    const passi = await db.getMoves(req.session.passi)
    const variazioni = await db.getVariations(req.session.passi)
    const bronzo1 = await db.getLevelMoves(req.session.passi, 'bronzo 1')
    const bronzo2 = await db.getLevelMoves(req.session.passi, 'bronzo 2')
    const bronzo3 = await db.getLevelMoves(req.session.passi, 'bronzo 3')
    const bronzo4 = await db.getLevelMoves(req.session.passi, 'bronzo 4')


    res.render('table', {passi: passi, variazioni: variazioni, bronzo1: bronzo1, bronzo2: bronzo2, bronzo3: bronzo3, bronzo4: bronzo4})
}

module.exports ={
    indexGet,
    dancesGet,
    indexPost,
    movesGet,
    movesPost
}