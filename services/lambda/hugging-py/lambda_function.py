# import os
# import json
# from transformers import MarianMTModel, MarianTokenizer

# # Get model directory from environment variable
# MODEL_DIR = os.getenv("MODEL_DIR", "/models")

# # Load the translation model and tokenizer
# tokenizer = MarianTokenizer.from_pretrained(MODEL_DIR)
# model = MarianMTModel.from_pretrained(MODEL_DIR)

# # Language code mapping
# LANGUAGE_CODE_MAP = {
#     "French": "fr",
#     "Spanish": "es",
#     "Portuguese": "pt",
#     "Italian": "it",
#     "Romanian": "ro"
# }

# def translate_text(text, target_language):
#     """Translate English text to the target language."""
#     if target_language not in LANGUAGE_CODE_MAP:
#         return f"Unsupported language: {target_language}"

#     language_code = LANGUAGE_CODE_MAP[target_language]
#     src_text = f">>{language_code}<< {text}"

#     inputs = tokenizer(src_text, return_tensors="pt", padding=True)
#     translated = model.generate(**inputs)
#     return tokenizer.decode(translated[0], skip_special_tokens=True)

# def lambda_handler(event, context):
#     """AWS Lambda handler function."""
#     try:
#         body = json.loads(event["body"])
#         text = body.get("text")
#         target_language = body.get("target_language")

#         if not text or not target_language:
#             return {"statusCode": 400, "body": json.dumps({"error": "Missing 'text' or 'target_language'."})}

#         translation = translate_text(text, target_language)
#         return {"statusCode": 200, "body": json.dumps({"translated_text": translation})}

#     except Exception as e:
#         return {"statusCode": 500, "body": json.dumps({"error": str(e)})}


def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "body": "Hello from Lambda!"
    }
