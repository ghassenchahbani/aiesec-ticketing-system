import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import api from '../api';
import './TicketList.css';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(6);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const isAdmin = user?.isAdmin || false;

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
  }, [user, isAdmin]);

  useEffect(() => {
    filterTickets();
    setCurrentPage(1); // Reset to first page when filters change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets, categoryFilter, statusFilter, searchQuery]);

  const fetchTickets = async () => {
    try {
      const response = await api.get('/tickets/');
      setTickets(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setLoading(false);
    }
  };

  const filterTickets = () => {
    let filtered = [...tickets];

    if (categoryFilter) {
      filtered = filtered.filter(ticket => ticket.category === categoryFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(ticket => 
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.created_by?.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTickets(filtered);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (!isAdmin) {
      alert('Only admin users can delete tickets');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await api.delete(`/tickets/${id}/`);
        fetchTickets();
      } catch (error) {
        console.error('Error deleting ticket:', error);
        alert(error.response?.data?.detail || 'Failed to delete ticket');
      }
    }
  };

  // Pagination logic
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="loading">Loading tickets...</div>;
  }

  return (
    <div className="ticket-list-container">
      <header className="header">
        <h1>Ticket Management System</h1>
        <div className="user-info">
          <span className="user-role">{isAdmin ? '👑 Admin' : '👤 User'}</span>
        </div>
        <div className="header-actions">
          {!isAdmin && (
            <button onClick={() => navigate('/create')} className="btn btn-primary">
              Create Ticket
            </button>
          )}
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title, description, or username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Technical">Technical</option>
          <option value="Financial">Financial</option>
          <option value="Product">Product</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Under Review">Under Review</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className="tickets-grid">
        {filteredTickets.length === 0 ? (
          <div className="no-tickets">No tickets found. Create your first ticket!</div>
        ) : (
          currentTickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <div className="ticket-header">
                <h3>{ticket.title}</h3>
                <span className={`status-badge status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                  {ticket.status}
                </span>
              </div>
              <p className="ticket-description">{ticket.description}</p>
              <div className="ticket-meta">
                <span className="category">{ticket.category}</span>
                <span className="created-by">👤 {ticket.created_by?.username || 'Unknown'}</span>
                <span className="date">
                  {new Date(ticket.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="ticket-actions">
                <button 
                  onClick={() => navigate(`/ticket/${ticket.id}`)} 
                  className="btn btn-view"
                >
                  View Details
                </button>
                {isAdmin ? (
                  <>
                    <button 
                      onClick={() => navigate(`/edit/${ticket.id}`)} 
                      className="btn btn-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(ticket.id)} 
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <span className="user-note">Only admins can edit/delete tickets</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          
          <div className="pagination-numbers">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}

      <div className="tickets-info">
        Showing {indexOfFirstTicket + 1} - {Math.min(indexOfLastTicket, filteredTickets.length)} of {filteredTickets.length} tickets
      </div>
    </div>
  );
};

export default TicketList;
