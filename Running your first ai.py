# test_ai.py
from transformers import pipeline

emotion_classifier = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")
print(emotion_classifier("I'm thrilled to learn about AI!"))