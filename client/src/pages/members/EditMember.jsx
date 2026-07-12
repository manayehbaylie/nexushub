import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMemberById, updateMember } from '../../services/memberService';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const EditMember = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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

  useEffect(() => {
    const loadMember = async () => {
      try {
        const member = await fetchMemberById(id);
        setForm({
          member_id: member.member_id || '',
          name: member.name || '',
          email: member.email || '',
          phone: member.phone || '',
          department: member.department || '',
          position: member.position || '',
          status: member.status || 'active',
          hire_date: member.hire_date ? member.hire_date.split('T')[0] : '',
        });
      } catch (err) {
        setError(err.message || 'Failed to load member');
      }
    };
    loadMember();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await updateMember(id, form);
      navigate('/members');
    } catch (err) {
      setError(err.message || 'Failed to update member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold'>Edit Member</h1>
          <p className='mt-2 text-sm text-slate-600'>Update member details.</p>
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
          <select name='status' value={form.status} onChange={handleChange} className='w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none'>
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
            {loading ? 'Updating...' : 'Update member'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditMember;
