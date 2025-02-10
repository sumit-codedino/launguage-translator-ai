const processor = require("./processor");
const winston = require("winston");

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

exports.handler = async (event) => {
  try {
    logger.info("Received event", { event });

    const results = await processor(event);

    logger.info("Language Translated", { results });

    return results;
  } catch (error) {
    logger.error("Error handling event", {
      error: error.message,
      stack: error.stack
    });

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: error.message
      })
    };
  }
};
