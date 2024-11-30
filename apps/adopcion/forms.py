from django import forms
from .models import FormularioAdopcion

class FormularioAdopcionForm(forms.ModelForm):
    class Meta:
        model = FormularioAdopcion
        fields = '__all__'
