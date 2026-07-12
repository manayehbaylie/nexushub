import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { logout } from '../../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <header className='flex items-center justify-between bg-slate-900 px-6 py-4 text-white'>
      <div className='text-lg font-semibold'>NexusHub</div>
      <div className='flex items-center gap-4'>
        <Link to='/search' className='text-slate-200 hover:text-white'>Search</Link>
        <button className='rounded bg-slate-700 px-3 py-2 hover:bg-slate-600' onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
