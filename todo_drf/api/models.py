from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False, blank=True, null=True)
    owner = models.ForeignKey(User, related_name='tasks', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title