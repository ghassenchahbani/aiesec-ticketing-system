from rest_framework import permissions


class IsAdminOrOwner(permissions.BasePermission):
    """
    Custom permission:
    - Admin users can view and edit all tickets
    - Regular users can only view their own tickets
    """
    
    def has_permission(self, request, view):
        # Authenticated users can list and create
        return request.user and request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        # Admin can do anything
        if request.user.is_staff:
            return True
        
        # Regular users can only access their own tickets
        return obj.created_by == request.user


class IsAdminUser(permissions.BasePermission):
    """
    Only admin users can perform this action
    """
    
    def has_permission(self, request, view):
        return request.user and request.user.is_staff
