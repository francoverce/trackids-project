from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('separate/', views.separate_audio, name='separate_audio'),
    path('separated_audio/', views.view_separated_audio, name='view_separated_audio'),
    path('audio/', views.AudioFileListCreateView.as_view(), name='audio-list-create'),
    path('audio/<int:pk>/', views.AudioFileRetrieveView.as_view(), name='audio-retrieve'),
]