const {Router} = require('express')
const indexController = require('../controllers/indexController')
const indexRouter = Router();

indexRouter.get('/', indexController.indexGet)
indexRouter.get('/balli', indexController.dancesGet)
indexRouter.post('/balli', indexController.indexPost)
indexRouter.get('/passi', indexController.movesGet)
indexRouter.post('/passi', indexController.movesPost)


module.exports = indexRouter