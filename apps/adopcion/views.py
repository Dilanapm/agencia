from django.shortcuts import render, redirect
from .forms import FormularioAdopcionForm

def formulario_adopcion(request):
    if request.method == 'POST':
        form = FormularioAdopcionForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('gracias')
    else:
        form = FormularioAdopcionForm()
    return render(request, 'adopcion/formulario.html', {'form': form})
