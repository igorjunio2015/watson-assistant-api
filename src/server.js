const Express = require('express');
const api = Express();
const watsonRoute = require("./routes/ibmWatson.route");

/**
 * @ROUTE
 * 
 * Rotas utilizadas pela aplicação
 */

api.use(Express.json());
api.use(watsonRoute);

/**
 * @CONFIG
 * 
 * Disponibilizar aplicacao
 */

var port = process.env.PORT || 3030;

api.listen(port, () => {
    console.log("Started server")
});