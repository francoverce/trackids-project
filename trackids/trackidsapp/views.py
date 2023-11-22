from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics
from .models import AudioFile
from .serializers import AudioFileSerializer

import demucs.separate

import os
from django.http import JsonResponse

def home(request):
    return JsonResponse({'message': 'Bienvenido a la aplicación de separación de audio'}, status=200)

"""SEPARAR AUDIO EN PISTAS"""
@csrf_exempt
def separate_audio(request):
    if request.method == 'POST':
            try:         
                demucs.separate.main(["--mp3", "-n", "mdx_extra", '***PATH_INPUT***'])
                return JsonResponse({'message': 'Separación exitosa'}, status=200)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)


"""RECUPERAR AUDIO SEPARADO"""
def view_separated_audio(request):
    # Define la ruta al directorio donde se almacenan las pistas separadas
    separated_audio_dir = '***PATH_OUTPUT***'

    # Obtiene la lista de archivos en el directorio
    separated_audio_files = os.listdir(separated_audio_dir)

    # Devuelve la lista de archivos como una respuesta JSON
    return JsonResponse({'separated_audio_files': separated_audio_files})

"""GUARDAR ARCHIVO DE AUDIO"""
class AudioFileListCreateView(generics.ListCreateAPIView):
    queryset = AudioFile.objects.all()
    serializer_class = AudioFileSerializer

"""RECUPERAR ARCHIVO DE AUDIO"""
class AudioFileRetrieveView(generics.RetrieveAPIView):
    queryset = AudioFile.objects.all()
    serializer_class = AudioFileSerializer
