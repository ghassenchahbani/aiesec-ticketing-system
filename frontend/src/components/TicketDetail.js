import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import api from '../api';
import './TicketDetail.css';

const TicketDetail = () => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusHistory, setStatusHistory] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const isAdmin = user?.isAdmin || false;

  useEffect(() => {
    fetchTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchTicket = async () => {
    try {
      const response = await api.get(`/tickets/${id}/`);
      setTicket(response.data);
      
      // Use status history from backend
      if (response.data.status_history && response.data.status_history.length > 0) {
        setStatusHistory(response.data.status_history);
      } else {
        // Fallback to create initial history if none exists
        setStatusHistory([
          { status: response.data.status, date: response.data.created_at, user: response.data.created_by?.username }
        ]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      setError('Failed to load ticket details');
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!isAdmin) {
      alert('Only admin users can change ticket status');
      return;
    }

    try {
      const response = await api.patch(`/tickets/${id}/status/`, { status: newStatus });
      
      // Update ticket with full response data including updated status_history
      setTicket(response.data);
      
      // Update status history from backend response
      if (response.data.status_history) {
        setStatusHistory(response.data.status_history);
      }
      
      alert('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert(error.response?.data?.detail || 'Failed to update status');
    }
  };

  const getFileExtension = (filename) => {
    if (!filename) return '';
    // Handle Cloudinary URLs - extract extension from URL or public_id
    const urlParts = filename.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    const extension = lastPart.split('.').pop().toLowerCase();
    return extension;
  };

  const isImage = (filename) => {
    if (!filename) return false;
    const ext = getFileExtension(filename);
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext);
  };

  const isPDF = (filename) => {
    if (!filename) return false;
    return getFileExtension(filename) === 'pdf';
  };

  if (loading) {
    return <div className="loading">Loading ticket details...</div>;
  }

  if (error || !ticket) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'Ticket not found'}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Tickets
        </button>
      </div>
    );
  }

  return (
    <div className="ticket-detail-container">
      <div className="detail-header">
        <button onClick={() => navigate('/')} className="btn btn-back">
          ← Back to Tickets
        </button>
        {isAdmin && (
          <button onClick={() => navigate(`/edit/${id}`)} className="btn btn-primary">
            Edit Ticket
          </button>
        )}
      </div>

      <div className="ticket-detail-card">
        <div className="detail-title-section">
          <h1>{ticket.title}</h1>
          <span className={`status-badge status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
            {ticket.status}
          </span>
        </div>

        <div className="detail-meta">
          <div className="meta-item">
            <strong>Category:</strong>
            <span className="category-badge">{ticket.category}</span>
          </div>
          <div className="meta-item">
            <strong>Created By:</strong>
            <span>👤 {ticket.created_by?.username || 'Unknown'}</span>
          </div>
          <div className="meta-item">
            <strong>Created:</strong>
            <span>{new Date(ticket.created_at).toLocaleString()}</span>
          </div>
          <div className="meta-item">
            <strong>Ticket ID:</strong>
            <span>#{ticket.id}</span>
          </div>
        </div>

        <div className="detail-section">
          <h3>Description</h3>
          <p className="description-text">{ticket.description}</p>
        </div>

        {ticket.attachment && (
          <div className="detail-section">
            <h3>Attachment</h3>
            <div className="attachment-preview">
              {isImage(ticket.attachment) ? (
                <div className="image-preview">
                  <img 
                    src={ticket.attachment} 
                    alt="Ticket attachment"
                    onError={(e) => {
                      console.error('Image failed to load:', ticket.attachment);
                      e.target.style.display = 'none';
                    }}
                  />
                  <a href={ticket.attachment} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    Open Full Size
                  </a>
                </div>
              ) : isPDF(ticket.attachment) ? (
                <div className="pdf-preview">
                  <div className="pdf-info">
                    <p>📄 PDF Document</p>
                    <a href={ticket.attachment} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Open in New Tab
                    </a>
                  </div>
                  <iframe
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(ticket.attachment)}&embedded=true`}
                    width="100%"
                    height="600px"
                    style={{ border: '1px solid #ddd', borderRadius: '8px' }}
                    title="PDF Preview"
                  />
                </div>
              ) : (
                <div className="file-download">
                  <span>📎 {ticket.attachment.split('/').pop()}</span>
                  <a href={ticket.attachment} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    View/Download File
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {isAdmin && (
          <div className="detail-section">
            <h3>Update Status</h3>
            <div className="status-update-buttons">
              <button
                onClick={() => handleStatusChange('New')}
                className={`status-btn ${ticket.status === 'New' ? 'active' : ''}`}
                disabled={ticket.status === 'New'}
              >
                New
              </button>
              <button
                onClick={() => handleStatusChange('Under Review')}
                className={`status-btn ${ticket.status === 'Under Review' ? 'active' : ''}`}
                disabled={ticket.status === 'Under Review'}
              >
                Under Review
              </button>
              <button
                onClick={() => handleStatusChange('Resolved')}
                className={`status-btn ${ticket.status === 'Resolved' ? 'active' : ''}`}
                disabled={ticket.status === 'Resolved'}
              >
                Resolved
              </button>
            </div>
          </div>
        )}

        <div className="detail-section">
          <h3>Status History</h3>
          <div className="status-history">
            {statusHistory.map((item, index) => (
              <div key={index} className="history-item">
                <div className="history-status">
                  <span className={`status-dot status-${item.status.toLowerCase().replace(' ', '-')}`}></span>
                  <strong>{item.status}</strong>
                </div>
                <div className="history-info">
                  <span>{new Date(item.changed_at || item.date).toLocaleString()}</span>
                  {(item.changed_by?.username || item.user) && <span>by {item.changed_by?.username || item.user}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
