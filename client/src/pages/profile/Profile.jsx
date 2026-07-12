import { useAuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuthContext();

  return (
    <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
      <h1 className='text-2xl font-semibold'>Profile</h1>
      <p className='mt-4 text-slate-700'>Name: {user?.name || 'Unknown'}</p>
      <p className='mt-2 text-slate-700'>Username: {user?.username || 'Unknown'}</p>
      <p className='mt-2 text-slate-700'>Role: {user?.role || 'User'}</p>
    </div>
  );
};

export default Profile;
