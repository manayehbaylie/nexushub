import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteRequest, fetchRequests, updateRequest } from '../../services/requestService';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Requests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '', priority: '' });
  const [loading, setLoading] = useState(false);

  const loadRequests = async (nextFilters = filters) => {
    setLoading(true);
    try {
      const data = await fetchRequests(nextFilters);
      setRequests(data || []);
    } catch (error) {
      console.error(error);
      alert('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests(filters);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = (event) => {
    event.preventDefault();
    loadRequests(filters);
  };

  const handleReset = () => {
    const cleared = { search: '', status: '', priority: '' };
    setFilters(cleared);
    loadRequests(cleared);
  };

  const handleDelete = async (request) => {
    if (!window.confirm(`Delete request ${request.title}?`)) return;
    try {
      await deleteRequest(request.id);
      loadRequests(filters);
    } catch (error) {
      console.error(error);
      alert('Failed to delete request');
    }
  };

  const handleStatusUpdate = async (request, status) => {
    try {
      await updateRequest(request.id, { ...request, status });
      loadRequests(filters);
    } catch (error) {
      console.error(error);
      alert('Failed to update request status');
    }
  };

  const summaryLabel = useMemo(() => {
    if (loading) return 'Loading requests...';
    if (requests.length === 0) return 'No requests match the current search.';
    return `${requests.length} matching requests`;
  }, [loading, requests.length]);

  return (
    <div className='space-y-5'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-semibold'>Requests</h1>
          <p className='text-sm text-slate-600'>{summaryLabel}</p>
        </div>
        <Button type='button' onClick={() => navigate('/requests/add')}>
          Add request
        </Button>
      </div>

      <form onSubmit={handleApply} className='flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm'>
        <Input name='search' value={filters.search} onChange={handleChange} placeholder='Search request number, title, or requester' />
        <select name='status' value={filters.status} onChange={handleChange} className='rounded border border-slate-300 bg-white px-3 py-2 text-slate-800'>
          <option value=''>All statuses</option>
          <option value='pending'>Pending</option>
          <option value='in_progress'>In Progress</option>
          <option value='completed'>Completed</option>
          <option value='cancelled'>Cancelled</option>
        </select>
        <select name='priority' value={filters.priority} onChange={handleChange} className='rounded border border-slate-300 bg-white px-3 py-2 text-slate-800'>
          <option value=''>All priorities</option>
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
          <option value='urgent'>Urgent</option>
        </select>
        <Button type='submit'>Apply</Button>
        <Button type='button' className='bg-slate-200 text-slate-800 hover:bg-slate-300' onClick={handleReset}>Reset</Button>
      </form>

      <Table>
        <thead className='bg-slate-100 text-left text-sm uppercase tracking-wide text-slate-600'>
          <tr>
            <th className='px-4 py-3'>Request #</th>
            <th className='px-4 py-3'>Title</th>
            <th className='px-4 py-3'>Status</th>
            <th className='px-4 py-3'>Assigned To</th>
            <th className='px-4 py-3'>Priority</th>
            <th className='px-4 py-3 text-right'>Actions</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-200'>
          {requests.length === 0 ? (
            <tr>
              <td colSpan='6' className='px-4 py-8 text-center text-slate-500'>No requests found.</td>
            </tr>
          ) : (
            requests.map((request) => (
              <tr key={request.id}>
                <td className='px-4 py-4 font-medium text-slate-700'>{request.request_number}</td>
                <td className='px-4 py-4'>{request.title}</td>
                <td className='px-4 py-4'>{request.status}</td>
                <td className='px-4 py-4'>{request.assigned_to_name || 'Unassigned'}</td>
                <td className='px-4 py-4'>{request.priority}</td>
                <td className='px-4 py-4 text-right'>
                  <div className='flex flex-wrap justify-end gap-2'>
                    <Button type='button' className='bg-blue-600 hover:bg-blue-700 px-3 py-1.5' onClick={() => navigate(`/requests/${request.id}`)}>
                      View
                    </Button>
                    <Button type='button' className='bg-slate-700 hover:bg-slate-600 px-3 py-1.5' onClick={() => navigate(`/requests/edit/${request.id}`)}>
                      Edit
                    </Button>
                    <Button type='button' className='bg-red-600 hover:bg-red-500 px-3 py-1.5' onClick={() => handleDelete(request)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Requests;
