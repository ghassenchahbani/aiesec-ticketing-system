from django.contrib import admin
from .models import Ticket, StatusHistory


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'status', 'created_by', 'created_at']
    list_filter = ['category', 'status', 'created_at']
    search_fields = ['title', 'description']
    readonly_fields = ['created_at']


@admin.register(StatusHistory)
class StatusHistoryAdmin(admin.ModelAdmin):
    list_display = ['ticket', 'status', 'changed_by', 'changed_at']
    list_filter = ['status', 'changed_at']
    search_fields = ['ticket__title']
    readonly_fields = ['changed_at']

