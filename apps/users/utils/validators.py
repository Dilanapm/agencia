import re

def is_valid_password(password,re_password):
    """
    Valida que la contraseña cumpla con los siguientes requisitos:
    - Al menos 10 caracteres
    - Al menos una letra mayúscula
    - Al menos un número
    - tambien si las contraseñas no coinciden:
    """
    if password != re_password:
        return False, "Las contraseñas no coinciden"
    if len(password) < 8:
        return False, "La contraseña debe tener al menos 8 caracteres."
    if not re.search(r'[A-Z]', password):  # Al menos una letra mayúscula
        return False, "La contraseña debe incluir al menos una letra mayúscula."
    if not re.search(r'\d', password):  # Al menos un número
        return False, "La contraseña debe incluir al menos un número."
    
    return True, "Contraseña válida."

def validate_gmail_email(email):
    if not email.endswith('@gmail.com'):
        return False, "El correo debe ser una dirección @gmail.com."
    # Verificar que no tenga espacios
    if " " in email:
        return False, "El correo no puede contener espacios."
    return True, "Correo válido."
