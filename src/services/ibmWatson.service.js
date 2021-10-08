const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");
require("dotenv").config();

/**
 * @CONFIG
 * 
 * Criar o assistant
 */

const assistant = new AssistantV2({
    version: process.env.ASSISTANT_VERSION,
    authenticator: new IamAuthenticator({
        apikey: process.env.ASSISTANT_APIKEY,
    }),
    serviceUrl: process.env.ASSISTANT_URL,
});

/**
 * @FUNCTION
 * 
 * Funções para criar e deletar sessão e envio de mensagem
 */

async function createSession() {
    var response = {
        error: false
    };

    await assistant.createSession({
        assistantId: process.env.ASSISTANT_ID
    })
        .then(res => {
            response.message = res.result;
        })
        .catch(err => {
            response = handleError(err);
        });
        return response;
}

async function sendMessage(input, sessionId) {
    var response = {
        error: false
    };

    await assistant.message({
        assistantId: process.env.ASSISTANT_ID,
        sessionId: sessionId,
        input: {
            'message_type': 'text',
            'text': input,
            'options': {
                'return_context': true
            }
        }
    })
        .then(res => {
            response.message = res.result;
        })
        .catch(err => {
            response = handleError(err);
        });
        return response;
}

async function deleteSession(sessionId) {
    var response = {
        error: false
    };

    await assistant.deleteSession({
        assistantId: process.env.ASSISTANT_ID,
        sessionId,
    })
        .then(res => {
            response.message = res.result;
        })
        .catch(err => {
            response = handleError(err);
        });

    return response;
}

function handleError(err) {
    return {
        error: err.status,
        message: err.message
    };
}

module.exports = {
    createSession,
    deleteSession,
    sendMessage
}

