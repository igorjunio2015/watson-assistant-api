const { Router, json } = require("express");
const watsonService = require("../services/watson.service");

const routes = Router();

/**
 * @ROUTE
 * 
 * Rota para enviar mensagem
 */

routes.post("/v1/session", async (req, res) => {
    const resp = await watsonService.createSession();

    if (resp.error) return res.status(resp.error).json(resp);
    return res.status(200).json(resp);
})

routes.delete("/v1/session", checkSessionIdBody, async (req, res) => {
    var { session_id } = req.body;

    const resp = await watsonService.deleteSession(session_id);

    if (resp.error) return res.status(resp.error).json(resp);
    return res.status(204).json(resp);
})

routes.post("/v1/message", checkMessageBody, checkSessionIdBody, async (req, res) => {
    var { input, session_id } = req.body;

    const resp = await watsonService.sendMessage(input, session_id);

    if (resp.error) return res.status(resp.error).json(resp);
    return res.status(200).json(resp)
})

/**
 * @MIDDLEWARE
 * 
 * Middlewares das rotas para IBM Watson
 */

function checkMessageBody(req, res, next) {
    if (!req.body.input) {
        return res.status(400).json({ error: "input in body not exists." });
    }
    return next();
};

function checkSessionIdBody(req, res, next) {
    if (!req.body.session_id) {
        return res.status(400).json({ error: "session_id not existis in body." });
    }
    return next();
}

module.exports = routes;