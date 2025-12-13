import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import api from '../api';
import './TicketForm.css';

const TicketForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technical');
  const [status, setStatus] = useState('New');
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const isAdmin = user?.isAdmin || false;

  useEffect(() => {
    if (isEdit) {
      // Check if user is admin before allowing edit
      if (!isAdmin) {
        alert('Only admin users can edit tickets');
        navigate('/');
        return;
      }
      fetchTicket();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchTicket = async () => {
    try {
      const response = await api.get(`/tickets/${id}/`);
      const ticket = response.data;
      setTitle(ticket.title);
      setDescription(ticket.description);
      setCategory(ticket.category);
      setStatus(ticket.status);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      const errorMsg = error.response?.data?.detail || 'Failed to load ticket';
      setError(errorMsg);
      alert(errorMsg + '. You may not have permission to edit this ticket.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('status', status);
    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      if (isEdit) {
        await api.put(`/tickets/${id}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/tickets/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving ticket:', error);
      const errorMsg = error.response?.data?.detail || error.response?.data?.message || 'Failed to save ticket';
      setError(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="ticket-form-container">
      <div className="ticket-form-box">
        <h2>{isEdit ? 'Edit Ticket' : 'Create New Ticket'}</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter ticket title"
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="5"
              placeholder="Enter detailed description"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Technical">Technical</option>
                <option value="Financial">Financial</option>
                <option value="Product">Product</option>
              </select>
            </div>

            {isAdmin && (
              <div className="form-group">
                <label>Status *</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="New">New</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Attachment (Optional)</label>
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
              accept="image/*,.pdf,.doc,.docx"
            />
            {attachment && (
              <p className="file-name">Selected: {attachment.name}</p>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (isEdit ? 'Update Ticket' : 'Create Ticket')}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
