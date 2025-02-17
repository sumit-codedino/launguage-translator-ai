import os
import json
import logging
import boto3
from functools import lru_cache
from transformers import MarianMTModel, MarianTokenizer
from tempfile import TemporaryDirectory

# Set environment variable for caching Hugging Face models
os.environ["TRANSFORMERS_CACHE"] = "/tmp/.cache"

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Get S3 Bucket and Model Path from environment variables
S3_BUCKET = os.getenv("S3_BUCKET", "codedino.io")
MODEL_PATH = os.getenv("MODEL_PATH", "models/marianmt-model")

# Language code mapping
LANGUAGE_CODE_MAP = {
    "French": "fr",
    "Spanish": "es",
    "Portuguese": "pt",
    "Italian": "it",
    "Romanian": "ro"
}

# Boto3 client for S3
s3_client = boto3.client("s3")

@lru_cache(maxsize=1)
def load_model():
    """Load the translation model and tokenizer (lazy loading)."""
    try:
        logger.info("Loading translation model from S3 bucket: %s", S3_BUCKET)
        
        # Download model files from S3 to a temporary directory
        with TemporaryDirectory() as tmp_dir:
            model_dir = os.path.join(tmp_dir, "model")
            os.makedirs(model_dir, exist_ok=True)
            
            # List the files to download (you should know the exact files required)
            model_files = [
                "pytorch_model.bin", "config.json", "vocab.json", "tokenizer_config.json", "special_tokens_map.json"
            ]
            
            for file_name in model_files:
                file_path = os.path.join(MODEL_PATH, file_name)
                local_path = os.path.join(model_dir, file_name)
                
                logger.info("Downloading %s to %s", file_path, local_path)
                s3_client.download_file(S3_BUCKET, file_path, local_path)
            
            # Load model and tokenizer
            tokenizer = MarianTokenizer.from_pretrained(model_dir)
            model = MarianMTModel.from_pretrained(model_dir)
            logger.info("Model loaded successfully")
            return tokenizer, model
    except Exception as e:
        logger.error("Failed to load model from S3: %s", str(e))
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

def handler(event, context):
    """AWS Lambda handler function."""
    try:
        logger.info("Received event: %s", json.dumps(event))

        body = json.loads(event["body"])
        text = body.get("text")
        target_language = body.get("target_language")

        if not text or not target_language:
            logger.warning("Missing 'text' or 'target_language' in request")
            return {
                "statusCode": 400,
                "isBase64Encoded": False,
                "body": json.dumps({"error": "Missing 'text' or 'target_language'."})
            }

        translation = translate_text(text, target_language)

        return {
            "statusCode": 200,
            "isBase64Encoded": False,
            "body": json.dumps({"translated_text": translation})
        }

    except Exception as e:
        logger.error("Unhandled exception: %s", str(e))
        return {
            "statusCode": 500,
            "isBase64Encoded": False,
            "body": json.dumps({"error": "Internal server error"})
        }
