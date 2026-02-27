import { useState, useEffect, useContext } from 'react';
import axios from '../utils/axiosInstance';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', description: '' });
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const limit = 10;

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const params = { page, limit };
      if (statusFilter) params.status = statusFilter;
      const res = await axios.get('/api/tasks', { params });
      setTasks(res.data.tasks);
      setCount(res.data.count);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, statusFilter]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/tasks', form);
      setForm({ title: '', description: '' });
      fetchTasks();
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, status) => {
    setLoading(true);
    setError('');
    try {
      await axios.put(`/api/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(count / limit);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>
      <form onSubmit={handleCreate} className="form">
        <input name="title" placeholder="Task Title" value={form.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Task'}</button>
      </form>
      <div className="filter-bar">
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className={`task-item ${task.status}`}>
            <div>
              <strong>{task.title}</strong>
              <span>{task.description}</span>
              <span>Status: {task.status}</span>
              <span>Created: {new Date(task.createdAt).toLocaleString()}</span>
            </div>
            <div className="task-actions">
              {task.status === 'pending' && (
                <button onClick={() => handleUpdate(task._id, 'completed')}>Mark Completed</button>
              )}
              {task.status === 'completed' && (
                <button onClick={() => handleUpdate(task._id, 'pending')}>Mark Pending</button>
              )}
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)} disabled={page === i + 1}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;