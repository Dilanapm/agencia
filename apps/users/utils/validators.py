import re

def is_valid_password(password):
    """
    Valida que la contraseña cumpla con los siguientes requisitos:
    - Al menos 10 caracteres
    - Al menos una letra mayúscula
    - Al menos un número
    """
    if len(password) < 10:
        return False, "La contraseña debe tener al menos 10 caracteres."
    if not re.search(r'[A-Z]', password):  # Al menos una letra mayúscula
        return False, "La contraseña debe incluir al menos una letra mayúscula."
    if not re.search(r'\d', password):  # Al menos un número
        return False, "La contraseña debe incluir al menos un número."
    return True, "Contraseña válida."

def validate_gmail_email(email):
    if not email.endswith('@gmail.com'):
        return False, "El correo debe ser una dirección @gmail.com."
    return True, "Correo válido."