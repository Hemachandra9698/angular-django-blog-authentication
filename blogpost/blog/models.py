from django.db import models
from django.contrib.auth.models import User


class TimeStampModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class Post(TimeStampModel):
    user = models.ForeignKey(User, unique=False, on_delete=models.CASCADE)
    desc = models.CharField(default='', max_length=200)

    def __str__(self):
        return self.desc

    class Meta:
        permissions = (
            ("update_post", "Can update a post"),
            ("edit a post", "Can edit a post"),
        )
