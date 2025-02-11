from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import MarianMTModel, MarianTokenizer

app = Flask(__name__)
CORS(app)

# Language map for model-specific language codes
LANGUAGE_CODE_MAP = {
    "French": "fr",
    "Spanish": "es",
    "Portugese": "pt",
    "Italian": "it",
    "Romanian": "ro"
}

# Load translation models and tokenizers
MODEL_NAME = "Helsinki-NLP/opus-mt-en-ROMANCE"
tokenizer = MarianTokenizer.from_pretrained(MODEL_NAME)
model = MarianMTModel.from_pretrained(MODEL_NAME)

def translate_text(text, target_language):
    """Translate English text to the target language."""
    if target_language not in LANGUAGE_CODE_MAP:
        return f"Unsupported language: {target_language}"
    
    language_code = LANGUAGE_CODE_MAP[target_language]
    src_text = f">>{language_code}<< {text}"
    
    inputs = tokenizer(src_text, return_tensors="pt", padding=True)
    translated = model.generate(**inputs)
    return tokenizer.decode(translated[0], skip_special_tokens=True)

@app.route("/translate", methods=["POST"])
def translate():
    """API endpoint to translate text."""
    data = request.get_json()
    text = data.get("text")
    target_language = data.get("target_language")
    
    if not text or not target_language:
        return jsonify({"error": "Please provide both 'text' and 'target_language'."}), 400

    translation = translate_text(text, target_language)
    return jsonify({"translated_text": translation})

if __name__ == "__main__":
    app.run(debug=True)
