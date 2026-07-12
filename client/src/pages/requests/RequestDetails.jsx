import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRequestById, updateRequest } from '../../services/requestService';
import Button from '../../components/common/Button';

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  const loadRequest = async () => {
    try {
      const data = await fetchRequestById(id);
      setRequest(data);
    } catch (err) {
      setError('Failed to load request details');
    }
  };

  useEffect(() => {
    loadRequest();
  }, [id]);

  const handleStatusChange = async (status) => {
    try {
      setUpdating(true);
      await updateRequest(id, { ...request, status });
      await loadRequest();
    } catch (err) {
      setError(err.message || 'Failed to update request status');
    } finally {
      setUpdating(false);
    }
  };

  if (!request) {
    return <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>{error || 'Loading request...'}</div>;
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold'>{request.title}</h1>
          <p className='text-sm text-slate-600'>{request.request_number}</p>
        </div>
        <div className='flex gap-2'>
          <Button type='button' className='bg-slate-700 hover:bg-slate-600' onClick={() => navigate(`/requests/edit/${request.id}`)}>Edit</Button>
          <Button type='button' onClick={() => navigate('/requests')}>Back to requests</Button>
        </div>
      </div>

      <div className='grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2'>
        <div className='space-y-3'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Status</p>
            <p className='text-slate-900'>{request.status}</p>
          </div>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Priority</p>
            <p className='text-slate-900'>{request.priority}</p>
          </div>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Assigned To</p>
            <p className='text-slate-900'>{request.assigned_to_name || 'Unassigned'}</p>
          </div>
        </div>
        <div className='space-y-3'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Due Date</p>
            <p className='text-slate-900'>{request.due_date ? new Date(request.due_date).toLocaleDateString() : 'Not set'}</p>
          </div>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Description</p>
            <p className='text-slate-900'>{request.description || 'No description provided.'}</p>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-2'>
        <Button type='button' className='bg-amber-600 hover:bg-amber-500' disabled={updating} onClick={() => handleStatusChange('in_progress')}>Mark In Progress</Button>
        <Button type='button' className='bg-emerald-600 hover:bg-emerald-500' disabled={updating} onClick={() => handleStatusChange('completed')}>Mark Completed</Button>
        <Button type='button' className='bg-slate-700 hover:bg-slate-600' disabled={updating} onClick={() => handleStatusChange('pending')}>Reset to Pending</Button>
      </div>
    </div>
  );
};

export default RequestDetails;
