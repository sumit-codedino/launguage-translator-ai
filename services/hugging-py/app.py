import os
import json
import logging
from functools import lru_cache
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import MarianMTModel, MarianTokenizer

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Model directory
MODEL_DIR = "./marianmt-model"

# Language code mapping
LANGUAGE_CODE_MAP = {
    "French": "fr",
    "Spanish": "es",
    "Portuguese": "pt",
    "Italian": "it",
    "Romanian": "ro"
}

app = Flask(__name__)
CORS(app)

@lru_cache(maxsize=1)
def load_model():
    """Load the translation model and tokenizer (lazy loading)."""
    try:
        logger.info("Loading translation model from %s", MODEL_DIR)
        tokenizer = MarianTokenizer.from_pretrained(MODEL_DIR)
        model = MarianMTModel.from_pretrained(MODEL_DIR)
        logger.info("Model loaded successfully")
        return tokenizer, model
    except Exception as e:
        logger.error("Failed to load model: %s", str(e))
        raise RuntimeError("Model loading failed")

def translate_text(text, target_language):
    """Translate English text to the target language."""
    try:
        if target_language not in LANGUAGE_CODE_MAP:
            logger.warning("Unsupported language requested: %s", target_language)
            return f"Unsupported language: {target_language}"

        tokenizer, model = load_model()
        language_code = LANGUAGE_CODE_MAP[target_language]
        src_text = f">>{language_code}<< {text}"

        logger.info("Translating text: %s -> %s", text, target_language)
        inputs = tokenizer(src_text, return_tensors="pt", padding=True)
        translated = model.generate(**inputs)
        translated_text = tokenizer.decode(translated[0], skip_special_tokens=True)

        logger.info("Translation successful: %s", translated_text)
        return translated_text
    except Exception as e:
        logger.error("Translation error: %s", str(e))
        return f"Translation error: {str(e)}"

@app.route("/translate", methods=["POST"])
def translate():
    """API endpoint for translation."""
    try:
        data = request.get_json()
        text = data.get("text")
        target_language = data.get("target_language")

        if not text or not target_language:
            logger.warning("Missing 'text' or 'target_language' in request")
            return jsonify({"error": "Missing 'text' or 'target_language'."}), 400

        translation = translate_text(text, target_language)
        return jsonify({"translated_text": translation}), 200
    except Exception as e:
        logger.error("Unhandled exception: %s", str(e))
        return jsonify({"error": "Internal server error"}), 500
    
@app.route("/health")
def health():
    """List all files in the container."""
    files = {}
    base_dirs = ["/app", "/app/models", "/tmp"]  # Directories to check

    for directory in base_dirs:
        try:
            files[directory] = os.listdir(directory)
        except Exception as e:
            files[directory] = f"Error accessing directory: {str(e)}"

    return jsonify({"status": "ok", "files": files})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
