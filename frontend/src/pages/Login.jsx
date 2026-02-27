import { useState } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/login', form);
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Login</h2>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required type="email" />
        <input name="password" placeholder="Password" value={form.password} onChange={handleChange} required type="password" />
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;