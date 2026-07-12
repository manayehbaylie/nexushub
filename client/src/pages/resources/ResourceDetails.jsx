import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchResource } from '../../services/resourceService';
import Button from '../../components/common/Button';

const ResourceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchResource(id);
        setResource(data);
      } catch (err) {
        setError('Failed to load resource details');
      }
    })();
  }, [id]);

  if (!resource) {
    return <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>{error || 'Loading resource...'}</div>;
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold'>{resource.name}</h1>
          <p className='text-sm text-slate-600'>{resource.resource_code}</p>
        </div>
        <div className='flex gap-2'>
          <Button type='button' className='bg-slate-700 hover:bg-slate-600' onClick={() => navigate(`/resources/edit/${resource.id}`)}>
            Edit
          </Button>
          <Button type='button' onClick={() => navigate('/resources')}>
            Back to resources
          </Button>
        </div>
      </div>

      <div className='grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2'>
        <div className='space-y-3'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Category</p>
            <p className='text-slate-900'>{resource.category}</p>
          </div>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Status</p>
            <p className='text-slate-900'>{resource.status}</p>
          </div>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Quantity</p>
            <p className='text-slate-900'>{resource.quantity || 0}</p>
          </div>
        </div>
        <div className='space-y-3'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Location</p>
            <p className='text-slate-900'>{resource.location || '—'}</p>
          </div>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Description</p>
            <p className='text-slate-900'>{resource.description || 'No description provided.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetails;
