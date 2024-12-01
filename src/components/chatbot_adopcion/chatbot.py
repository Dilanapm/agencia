import random
import json
import numpy as np
from tensorflow.keras.models import load_model
from nltk.stem import WordNetLemmatizer
import pickle

# Cargar palabras y clases
with open('words.pkl', 'rb') as file:
    words = pickle.load(file)
with open('classes.pkl', 'rb') as file:
    classes = pickle.load(file)

# Cargar el modelo entrenado
model = load_model('chatbot_model.h5')

# Inicializar el lematizador
lemmatizer = WordNetLemmatizer()

# Tokenizador personalizado
def simple_tokenize(text):
    return text.lower().split()

# Función para limpiar y tokenizar las oraciones
def clean_up_sentence(sentence):
    sentence_words = simple_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
    return sentence_words

# Función para crear la bolsa de palabras
def bow(sentence, words):
    sentence_words = clean_up_sentence(sentence)
    bag = [1 if word in sentence_words else 0 for word in words]
    return np.array(bag)

# Función para predecir la clase
def predict_class(sentence):
    bow_vector = bow(sentence, words)
    res = model.predict(np.array([bow_vector]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return [{"intent": classes[r[0]], "probability": str(r[1])} for r in results]

# Función para obtener la respuesta del bot
def get_response(intents_list, intents_json):
    tag = intents_list[0]['intent']
    for intent in intents_json['intents']:
        if intent['tag'] == tag:
            return random.choice(intent['responses'])

# Cargar el archivo intents.json
with open('intents.json', encoding='utf-8') as file:
    intents = json.load(file)

print("Chatbot listo para usar.")

while True:
    message = input("Tú: ")
    if message.lower() == "salir":
        print("Chatbot: ¡Adiós!")
        break
    ints = predict_class(message)
    res = get_response(ints, intents)
    print(f"Chatbot: {res}")
