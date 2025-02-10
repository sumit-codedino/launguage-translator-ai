const winston = require('winston');
const fetch = require('node-fetch');
const { pipeline } = require('@xenova/transformers');

// Configure logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

// Load the translation pipeline
let translator;
(async () => {
    translator = await pipeline('translation', 'facebook/m2m100_418M');
})();

module.exports = async (event) => {
    let response = {
        statusCode: 500,
        body: JSON.stringify({
            message: 'Internal Server Error',
        }),
    };

    try {
        const eventBody = event.body;
        const parsedEvent = JSON.parse(eventBody);
        logger.info("Parsed Event", parsedEvent);

        if (!parsedEvent.text || !parsedEvent.language) {
            response.statusCode = 400;
            response.body = JSON.stringify({ message: 'Missing text or language.' });
            return response;
        }

        // Ensure the translator is loaded
        if (!translator) {
            response.statusCode = 503;
            response.body = JSON.stringify({ message: 'Translator model is loading. Please try again shortly.' });
            return response;
        }

        // Perform translation
        const translation = await translator(parsedEvent.text, {
            src_lang: 'en', // Adjust based on your source language
            tgt_lang: parsedEvent.language,
        });

        logger.info("Translation", { translation });

        // Success response
        response = {
            statusCode: 200,
            body: JSON.stringify({
                data: translation,
            }),
        };

    } catch (error) {
        logger.error("Error occurred", {
            error: error.message,
            stack: error.stack,
        });

        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: "An unexpected error occurred",
                details: error.message,
            }),
        };
    }

    return response;
};
