import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Login from '../pages/auth/Login';
import Unauthorized from '../pages/auth/Unauthorized';
import Dashboard from '../pages/dashboard/Dashboard';
import Members from '../pages/members/Members';
import AddMember from '../pages/members/AddMember';
import EditMember from '../pages/members/EditMember';
import MemberDetails from '../pages/members/MemberDetails';
import Requests from '../pages/requests/Requests';
import AddRequest from '../pages/requests/AddRequest';
import EditRequest from '../pages/requests/EditRequest';
import RequestDetails from '../pages/requests/RequestDetails';
import Resources from '../pages/resources/Resources';
import AddResource from '../pages/resources/AddResource';
import EditResource from '../pages/resources/EditResource';
import ResourceDetails from '../pages/resources/ResourceDetails';
import Statistics from '../pages/statistics/Statistics';
import GlobalSearch from '../pages/search/GlobalSearch';
import Profile from '../pages/profile/Profile';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/unauthorized' element={<Unauthorized />} />
      <Route path='/' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path='members' element={<Members />} />
        <Route path='members/add' element={<AddMember />} />
        <Route path='members/edit/:id' element={<EditMember />} />
        <Route path='members/:id' element={<MemberDetails />} />
        <Route path='requests' element={<Requests />} />
        <Route path='requests/add' element={<AddRequest />} />
        <Route path='requests/edit/:id' element={<EditRequest />} />
        <Route path='requests/:id' element={<RequestDetails />} />
        <Route path='resources' element={<Resources />} />
        <Route path='resources/add' element={<AddResource />} />
        <Route path='resources/edit/:id' element={<EditResource />} />
        <Route path='resources/:id' element={<ResourceDetails />} />
        <Route path='statistics' element={<Statistics />} />
        <Route path='search' element={<GlobalSearch />} />
        <Route path='profile' element={<Profile />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
