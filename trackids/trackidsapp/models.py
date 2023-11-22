from django.db import models

class AudioFile(models.Model):
    filename = models.CharField(max_length=255)
    mime_type = models.CharField(max_length=50)
    size = models.IntegerField()
    data = models.BinaryField()