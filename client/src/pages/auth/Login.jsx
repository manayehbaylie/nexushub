import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { login } from '../../services/authService';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Login = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('1111');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuthContext();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await login({ username, password });
      const session = {
        user: result.user,
        token: result.token,
      };
      localStorage.setItem('nexushub_session', JSON.stringify(session));
      setUser(result.user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to login');
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-50 px-4'>
      <div className='w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-lg'>
        <h1 className='mb-6 text-2xl font-semibold text-slate-900'>Sign in to NexusHub</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='mb-2 block text-sm font-medium text-slate-700'>Username</label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium text-slate-700'>Password</label>
            <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
          </div>
          {error && <p className='text-sm text-red-600'>{error}</p>}
          <Button type='submit' className='w-full'>Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
