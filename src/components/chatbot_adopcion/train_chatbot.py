import nltk
from nltk.stem import WordNetLemmatizer
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
import json
import random
import pickle  # Importar para guardar las listas

# Configurar la ruta personalizada de nltk_data
nltk.data.path.append('C:/Users/Lisandro/nltk_data')

# Descargar recursos necesarios de NLTK
nltk.download('wordnet', download_dir='C:/Users/Lisandro/nltk_data')

# Tokenizador personalizado (sin usar nltk.word_tokenize)
def simple_tokenize(text):
    return text.lower().split()  # Divide el texto por espacios y lo convierte a minúsculas

lemmatizer = WordNetLemmatizer()

# Cargar el archivo intents.json
with open('intents.json', encoding='utf-8') as file:
    intents = json.load(file)

# Preprocesamiento de datos
words = []
classes = []
documents = []
ignore_words = ['?', '!', '.', ',']

for intent in intents['intents']:
    for pattern in intent['patterns']:
        word_list = simple_tokenize(pattern)  # Usar el tokenizador personalizado
        words.extend(word_list)
        documents.append((word_list, intent['tag']))
        if intent['tag'] not in classes:
            classes.append(intent['tag'])

# Lematización y eliminación de palabras ignoradas
words = [lemmatizer.lemmatize(w) for w in words if w not in ignore_words]
words = sorted(set(words))
classes = sorted(set(classes))

# Crear el conjunto de entrenamiento
training = []
output_empty = [0] * len(classes)

for doc in documents:
    bag = []
    word_patterns = [lemmatizer.lemmatize(w) for w in doc[0]]
    for word in words:
        bag.append(1) if word in word_patterns else bag.append(0)
    output_row = list(output_empty)
    output_row[classes.index(doc[1])] = 1
    training.append([bag, output_row])

random.shuffle(training)
training = np.array(training, dtype=object)
train_x = np.array(list(training[:, 0]))
train_y = np.array(list(training[:, 1]))

# Crear y entrenar el modelo neuronal
model = Sequential()
model.add(Dense(128, input_shape=(len(train_x[0]),), activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(train_y[0]), activation='softmax'))
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Entrenar el modelo
model.fit(train_x, train_y, epochs=200, batch_size=5, verbose=1)

# Guardar las listas de palabras y clases
with open('words.pkl', 'wb') as file:
    pickle.dump(words, file)
with open('classes.pkl', 'wb') as file:
    pickle.dump(classes, file)

# Guardar el modelo entrenado
model.save('chatbot_model.h5')
print("Modelo entrenado, palabras y clases guardadas.")
