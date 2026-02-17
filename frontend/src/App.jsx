import { useEffect, useState } from 'react';
import './App.css';

// Use environment variable for API URL, fallback to /api/guestbook for production
const API_URL = import.meta.env.VITE_API_URL || '/api/guestbook';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. READ (GET) - Fetch all guestbook entries
  const fetchEntries = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(API_URL);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch entries: ${res.status}`);
      }
      
      const data = await res.json();
      setEntries(data || []);
    } catch (err) {
      setError(`Error loading entries: ${err.message}`);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load entries on component mount
  useEffect(() => {
    fetchEntries();
  }, []);

  // 2. CREATE (POST) & UPDATE (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      setError('Please fill in both name and message');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Failed to ${editingId ? 'update' : 'create'} entry`);
      }

      // Reset form and refresh entries
      setFormData({ name: '', message: '' });
      setEditingId(null);
      await fetchEntries();
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 3. DELETE
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

      if (!res.ok) {
        throw new Error('Failed to delete entry');
      }

      await fetchEntries();
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Start editing an entry
  const startEdit = (entry) => {
    setEditingId(entry.id);
    setFormData({ name: entry.name, message: entry.message });
    setError('');
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', message: '' });
    setError('');
  };

  return (
    <div className="container">
      <header className="header">
        <h1>📖 My Guestbook</h1>
        <p className="subtitle">Leave a message and sign my guestbook!</p>
      </header>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Form for Create/Update */}
      <div className="form-container">
        <h2>{editingId ? '✏️ Edit Entry' : '✍️ Sign Guestbook'}</h2>
        <form onSubmit={handleSubmit} className="guestbook-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Your message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows="4"
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : editingId ? '💾 Update Entry' : '📝 Sign Guestbook'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={cancelEdit} disabled={loading}>
                ❌ Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List of Entries */}
      <div className="entries-container">
        <h2>💬 Guestbook Entries ({entries.length})</h2>
        
        {loading && entries.length === 0 ? (
          <div className="loading">Loading entries...</div>
        ) : entries.length === 0 ? (
          <div className="empty-state">
            <p>No entries yet. Be the first to sign the guestbook! ✨</p>
          </div>
        ) : (
          <div className="entries-list">
            {entries.map((entry) => (
              <div key={entry.id} className="entry-card">
                <div className="entry-header">
                  <strong className="entry-name">{entry.name}</strong>
                  <span className="entry-date">
                    {new Date(entry.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="entry-message">{entry.message}</p>
                <div className="entry-actions">
                  <button
                    className="btn-small btn-edit"
                    onClick={() => startEdit(entry)}
                    disabled={loading}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn-small btn-delete"
                    onClick={() => handleDelete(entry.id)}
                    disabled={loading}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="footer">
        <p>Built with React, NestJS, and Supabase 🚀</p>
      </footer>
    </div>
  );
}
