import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => (
  <div className='min-h-screen bg-slate-50'>
    <Navbar />
    <div className='flex min-h-[calc(100vh-64px)]'>
      <Sidebar />
      <main className='flex-1 p-6'>
        <Outlet />
      </main>
    </div>
    <Footer />
  </div>
);

export default Layout;
