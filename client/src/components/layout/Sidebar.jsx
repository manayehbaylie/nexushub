import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <aside className='w-64 border-r border-slate-200 bg-white p-6'>
    <nav className='space-y-3'>
      <NavLink to='/' end className={({ isActive }) => isActive ? 'block rounded-2xl bg-slate-900 px-4 py-3 text-white' : 'block rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-100'}>Dashboard</NavLink>
      <NavLink to='/members' className={({ isActive }) => isActive ? 'block rounded-2xl bg-slate-900 px-4 py-3 text-white' : 'block rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-100'}>Members</NavLink>
      <NavLink to='/requests' className={({ isActive }) => isActive ? 'block rounded-2xl bg-slate-900 px-4 py-3 text-white' : 'block rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-100'}>Requests</NavLink>
      <NavLink to='/resources' className={({ isActive }) => isActive ? 'block rounded-2xl bg-slate-900 px-4 py-3 text-white' : 'block rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-100'}>Resources</NavLink>
      <NavLink to='/statistics' className={({ isActive }) => isActive ? 'block rounded-2xl bg-slate-900 px-4 py-3 text-white' : 'block rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-100'}>Statistics</NavLink>
      <NavLink to='/profile' className={({ isActive }) => isActive ? 'block rounded-2xl bg-slate-900 px-4 py-3 text-white' : 'block rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-100'}>Profile</NavLink>
    </nav>
  </aside>
);

export default Sidebar;
