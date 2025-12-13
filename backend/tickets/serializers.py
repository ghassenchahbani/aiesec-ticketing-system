from rest_framework import serializers
from .models import Ticket, StatusHistory
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class StatusHistorySerializer(serializers.ModelSerializer):
    changed_by = UserSerializer(read_only=True)
    
    class Meta:
        model = StatusHistory
        fields = ['id', 'status', 'changed_by', 'changed_at']
        read_only_fields = ['id', 'changed_by', 'changed_at']


class TicketSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    status_history = StatusHistorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Ticket
        fields = ['id', 'title', 'description', 'category', 'status', 'attachment', 'created_by', 'created_at', 'status_history']
        read_only_fields = ['id', 'created_by', 'created_at']
    
    def to_representation(self, instance):
        """Convert the attachment field to a proper URL in the response"""
        data = super().to_representation(instance)
        
        # Handle attachment URL
        if instance.attachment:
            try:
                # CloudinaryField has a .url property that gives the full URL
                if hasattr(instance.attachment, 'url'):
                    attachment_url = instance.attachment.url
                    
                    # Fix PDF URLs - change image/upload to raw/upload for PDFs
                    if attachment_url and attachment_url.endswith('.pdf'):
                        attachment_url = attachment_url.replace('/image/upload/', '/raw/upload/')
                    
                    data['attachment'] = attachment_url
                else:
                    # Fallback: manually construct URL
                    public_id = str(instance.attachment)
                    
                    if public_id:
                        # Check if it's a PDF
                        if public_id.lower().endswith('.pdf'):
                            # PDFs: use raw/upload
                            url = f"https://res.cloudinary.com/dxjn4oqwj/raw/upload/{public_id}"
                        else:
                            # Images use image/upload
                            url = f"https://res.cloudinary.com/dxjn4oqwj/image/upload/{public_id}"
                        
                        data['attachment'] = url
                    else:
                        data['attachment'] = None
            except Exception as e:
                print(f"Error getting attachment URL: {e}")
                import traceback
                traceback.print_exc()
                data['attachment'] = None
        else:
            data['attachment'] = None
        
        return data
    
    def update(self, instance, validated_data):
        # Handle partial updates properly
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.category = validated_data.get('category', instance.category)
        instance.status = validated_data.get('status', instance.status)
        
        # Handle file upload
        if 'attachment' in validated_data:
            instance.attachment = validated_data.get('attachment')
        
        instance.save()
        return instance
