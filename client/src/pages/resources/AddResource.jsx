import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createResource } from '../../services/resourceService';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const AddResource = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    resource_code: '',
    name: '',
    category: '',
    description: '',
    status: 'available',
    quantity: 1,
    location: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = { ...form, quantity: parseInt(form.quantity, 10) || 0 };
      await createResource(payload);
      navigate('/resources');
    } catch (err) {
      setError(err.message || 'Failed to create resource');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold'>Add Resource</h1>
          <p className='mt-2 text-sm text-slate-600'>Add a new resource to the system.</p>
        </div>
        <Button type='button' onClick={() => navigate('/resources')}>
          Back to resources
        </Button>
      </div>

      <form onSubmit={handleSubmit} className='grid gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-700'>Resource Code</label>
          <Input name='resource_code' value={form.resource_code} onChange={handleChange} required />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-700'>Name</label>
          <Input name='name' value={form.name} onChange={handleChange} required />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-700'>Category</label>
          <Input name='category' value={form.category} onChange={handleChange} required />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-700'>Location</label>
          <Input name='location' value={form.location} onChange={handleChange} />
        </div>

        <div className='space-y-2 md:col-span-2'>
          <label className='block text-sm font-medium text-slate-700'>Description</label>
          <textarea name='description' value={form.description} onChange={handleChange} rows={4} className='w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-500' />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-700'>Quantity</label>
          <Input name='quantity' type='number' min='0' value={form.quantity} onChange={handleChange} />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-700'>Status</label>
          <select name='status' value={form.status} onChange={handleChange} className='w-full rounded-md border border-slate-300 px-3 py-2'>
            <option value='available'>Available</option>
            <option value='in_use'>In Use</option>
            <option value='maintenance'>Maintenance</option>
            <option value='retired'>Retired</option>
          </select>
        </div>

        <div className='md:col-span-2'>
          {error && <p className='mb-3 text-sm text-red-600'>{error}</p>}
          <Button type='submit' className='w-full' disabled={loading}>{loading ? 'Saving...' : 'Save resource'}</Button>
        </div>
      </form>
    </div>
  );
};

export default AddResource;

