import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMember } from '../../services/memberService';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const AddMember = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    member_id: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    status: 'active',
    hire_date: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createMember(form);
      navigate('/members');
    } catch (err) {
      setError(err.message || 'Failed to add member.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold'>Add Member</h1>
          <p className='mt-2 text-sm text-slate-600'>Fill in member details and save.</p>
        </div>
        <Button type='button' onClick={() => navigate('/members')}>
          Back to members
        </Button>
      </div>

      <form onSubmit={handleSubmit} className='grid gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-700'>Member ID</label>
          <Input name='member_id' value={form.member_id} onChange={handleChange} required />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-700'>Name</label>
          <Input name='name' value={form.name} onChange={handleChange} required />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-700'>Email</label>
          <Input name='email' type='email' value={form.email} onChange={handleChange} required />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-700'>Phone</label>
          <Input name='phone' value={form.phone} onChange={handleChange} required />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-700'>Department</label>
          <Input name='department' value={form.department} onChange={handleChange} required />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-700'>Position</label>
          <Input name='position' value={form.position} onChange={handleChange} required />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-700'>Status</label>
          <select
            name='status'
            value={form.status}
            onChange={handleChange}
            className='w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none'
          >
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
            <option value='on_leave'>On Leave</option>
          </select>
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-slate-700'>Hire Date</label>
          <Input name='hire_date' type='date' value={form.hire_date} onChange={handleChange} />
        </div>

        <div className='md:col-span-2'>
          {error && <p className='mb-3 text-sm text-red-600'>{error}</p>}
          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? 'Saving...' : 'Save member'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
