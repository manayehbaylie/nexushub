import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMemberById } from '../../services/memberService';
import Button from '../../components/common/Button';

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMemberById(id);
        setMember(data);
      } catch (err) {
        setError('Failed to load member details');
      }
    })();
  }, [id]);

  if (!member) {
    return <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>{error || 'Loading member...'}</div>;
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold'>{member.name}</h1>
          <p className='text-sm text-slate-600'>{member.member_id}</p>
        </div>
        <div className='flex gap-2'>
          <Button type='button' className='bg-slate-700 hover:bg-slate-600' onClick={() => navigate(`/members/edit/${member.id}`)}>Edit</Button>
          <Button type='button' onClick={() => navigate('/members')}>Back to members</Button>
        </div>
      </div>

      <div className='grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2'>
        <div className='space-y-3'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Email</p>
            <p className='text-slate-900'>{member.email}</p>
          </div>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Phone</p>
            <p className='text-slate-900'>{member.phone}</p>
          </div>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Department</p>
            <p className='text-slate-900'>{member.department}</p>
          </div>
        </div>
        <div className='space-y-3'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Position</p>
            <p className='text-slate-900'>{member.position}</p>
          </div>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Status</p>
            <p className='text-slate-900'>{member.status}</p>
          </div>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Hire Date</p>
            <p className='text-slate-900'>{member.hire_date ? new Date(member.hire_date).toLocaleDateString() : 'Not set'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
