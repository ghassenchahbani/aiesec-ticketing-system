from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Ticket, StatusHistory
from .serializers import TicketSerializer
from .permissions import IsAdminOrOwner


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated, IsAdminOrOwner]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'status']
    ordering = ['-created_at']

    def get_queryset(self):
        """
        Admin users see all tickets
        Regular users see only their own tickets
        """
        if self.request.user.is_staff:
            return Ticket.objects.all()
        return Ticket.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        """Create ticket and initial status history"""
        ticket = serializer.save(created_by=self.request.user)
        # Create initial status history entry
        StatusHistory.objects.create(
            ticket=ticket,
            status=ticket.status,
            changed_by=self.request.user
        )

    def update(self, request, *args, **kwargs):
        """
        Admin: Can update any ticket (including status)
        Regular User: Cannot update tickets
        """
        if not request.user.is_staff:
            return Response(
                {"detail": "Only admin users can update tickets."},
                status=status.HTTP_403_FORBIDDEN
            )
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        old_status = instance.status
        
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        # Track status changes
        new_status = serializer.instance.status
        if old_status != new_status:
            StatusHistory.objects.create(
                ticket=serializer.instance,
                status=new_status,
                changed_by=request.user
            )
        
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        """
        Admin: Can partially update any ticket (including status)
        Regular User: Cannot update tickets
        """
        if not request.user.is_staff:
            return Response(
                {"detail": "Only admin users can update tickets."},
                status=status.HTTP_403_FORBIDDEN
            )
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Admin: Can delete any ticket
        Regular User: Cannot delete tickets
        """
        if not request.user.is_staff:
            return Response(
                {"detail": "Only admin users can delete tickets."},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().destroy(request, *args, **kwargs)

    @action(detail=True, methods=['patch'], url_path='status')
    def update_status(self, request, pk=None):
        """
        Custom endpoint for status updates: PATCH /api/tickets/:id/status
        Admin only
        """
        if not request.user.is_staff:
            return Response(
                {"detail": "Only admin users can update ticket status."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        ticket = self.get_object()
        old_status = ticket.status
        new_status = request.data.get('status')
        
        if not new_status:
            return Response(
                {"detail": "Status field is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate status
        valid_statuses = ['New', 'Under Review', 'Resolved']
        if new_status not in valid_statuses:
            return Response(
                {"detail": f"Invalid status. Must be one of: {', '.join(valid_statuses)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        ticket.status = new_status
        ticket.save()
        
        # Track status change
        if old_status != new_status:
            StatusHistory.objects.create(
                ticket=ticket,
                status=new_status,
                changed_by=request.user
            )
        
        serializer = self.get_serializer(ticket)
        return Response(serializer.data)
