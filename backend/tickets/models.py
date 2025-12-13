from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

class Ticket(models.Model):

    CATEGORY_CHOICES = [
        ('Technical', 'Technical'),
        ('Financial', 'Financial'),
        ('Product', 'Product'),
    ]

    STATUS_CHOICES = [
        ('New', 'New'),
        ('Under Review', 'Under Review'),
        ('Resolved', 'Resolved'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='New')
    attachment = CloudinaryField('attachment', null=True, blank=True, folder='tickets/')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tickets')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class StatusHistory(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='status_history')
    status = models.CharField(max_length=20)
    changed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    changed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['changed_at']
        verbose_name_plural = 'Status histories'

    def __str__(self):
        return f"{self.ticket.title} - {self.status} - {self.changed_at}"
