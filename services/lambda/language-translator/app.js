import 'dotenv/config';
import express from 'express';
import { pipeline } from '@huggingface/transformers';
import winston from 'winston';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

const languages = {
  "Arabic": "ar_AR",
  "English": "en_XX",
  "French": "fr_XX",
  "Spanish": "es_XX",
  // Add more languages as needed
};

let translator;

async function loadModelWithTimeout() {
  logger.info('Loading translation model. This may take a while...');
  const modelLoadingPromise = pipeline('translation', 'Xenova/mbart-large-50-many-to-many-mmt');
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Model loading timed out after 60 seconds')), 60000)
  );
  return Promise.race([modelLoadingPromise, timeoutPromise]);
}

async function initializeServer() {
  try {
    const startTime = Date.now();
    translator = await loadModelWithTimeout();
    const endTime = Date.now();
    logger.info(`Translation model loaded in ${(endTime - startTime) / 1000} seconds.`);

    // Start the server after model initialization
    app.listen(port, () => {
      logger.info(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    logger.error(error.message);
  }
}

initializeServer();

app.post('/translate', async (req, res) => {
  const { text, targetLanguage, sourceLanguage } = req.body;

  if (!text || !targetLanguage || !sourceLanguage) {
    logger.error('Missing text, targetLanguage, or sourceLanguage in request body');
    return res.status(400).json({ error: 'Missing text, targetLanguage, or sourceLanguage.' });
  }

  const sourceLangCode = languages[sourceLanguage];
  const targetLangCode = languages[targetLanguage];

  if (!sourceLangCode) {
    return res.status(400).json({ error: 'Invalid source language.' });
  }
  if (!targetLangCode) {
    return res.status(400).json({ error: 'Invalid target language.' });
  }

  try {
    logger.info(`Translating "${text}" from "${sourceLanguage}" to "${targetLanguage}"`);

    const translation = await translator(text, {
      src_lang: sourceLangCode,
      tgt_lang: targetLangCode,
    });

    const translatedText = translation[0]?.translation_text || 'Translation error';
    res.json({ translatedText });
  } catch (error) {
    logger.error('Translation error', { error: error.message });
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.get('/health', (req, res) => {
  if (translator) {
    res.status(200).json({ status: 'ok', model: 'loaded' });
  } else {
    res.status(503).json({ status: 'error', model: 'not loaded' });
  }
});