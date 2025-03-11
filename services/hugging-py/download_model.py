from transformers import MarianMTModel, MarianTokenizer

# Model name
MODEL_NAME = "Helsinki-NLP/opus-mt-en-ROMANCE"

# Local directory to save the model
SAVE_DIR = "./marianmt-model"

# Download and save the model
print(f"Downloading model: {MODEL_NAME}...")
model = MarianMTModel.from_pretrained(MODEL_NAME)
tokenizer = MarianTokenizer.from_pretrained(MODEL_NAME)

model.save_pretrained(SAVE_DIR)
tokenizer.save_pretrained(SAVE_DIR)

print(f"Model downloaded and saved to {SAVE_DIR}")