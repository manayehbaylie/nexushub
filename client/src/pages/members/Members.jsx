import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteMember, fetchMembers } from '../../services/memberService';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Members = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [filters, setFilters] = useState({ search: '', department: '', status: '' });
  const [loading, setLoading] = useState(false);

  const loadMembers = async (nextFilters = filters) => {
    setLoading(true);
    try {
      const data = await fetchMembers(nextFilters);
      setMembers(data || []);
    } catch (error) {
      console.error(error);
      alert('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers(filters);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = (event) => {
    event.preventDefault();
    loadMembers(filters);
  };

  const handleReset = () => {
    const cleared = { search: '', department: '', status: '' };
    setFilters(cleared);
    loadMembers(cleared);
  };

  const handleDelete = async (member) => {
    if (!window.confirm(`Delete member ${member.name}?`)) return;
    try {
      await deleteMember(member.id);
      loadMembers(filters);
    } catch (error) {
      console.error(error);
      alert('Failed to delete member');
    }
  };

  const summaryLabel = useMemo(() => {
    if (loading) return 'Loading members...';
    if (members.length === 0) return 'No members match the current filters.';
    return `${members.length} members found`;
  }, [loading, members.length]);

  return (
    <div className='space-y-5'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-semibold'>Members</h1>
          <p className='text-sm text-slate-600'>{summaryLabel}</p>
        </div>
        <Button type='button' onClick={() => navigate('/members/add')}>
          Add member
        </Button>
      </div>

      <form onSubmit={handleApply} className='flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm'>
        <Input name='search' value={filters.search} onChange={handleChange} placeholder='Search by name, email, or phone' />
        <select name='department' value={filters.department} onChange={handleChange} className='rounded border border-slate-300 bg-white px-3 py-2 text-slate-800'>
          <option value=''>All departments</option>
          <option value='Engineering'>Engineering</option>
          <option value='Sales'>Sales</option>
          <option value='Operations'>Operations</option>
          <option value='HR'>HR</option>
        </select>
        <select name='status' value={filters.status} onChange={handleChange} className='rounded border border-slate-300 bg-white px-3 py-2 text-slate-800'>
          <option value=''>All statuses</option>
          <option value='active'>Active</option>
          <option value='inactive'>Inactive</option>
          <option value='on_leave'>On Leave</option>
        </select>
        <Button type='submit'>Apply</Button>
        <Button type='button' className='bg-slate-200 text-slate-800 hover:bg-slate-300' onClick={handleReset}>Reset</Button>
      </form>

      <Table>
        <thead className='bg-slate-100 text-left text-sm uppercase tracking-wide text-slate-600'>
          <tr>
            <th className='px-4 py-3'>Name</th>
            <th className='px-4 py-3'>Email</th>
            <th className='px-4 py-3'>Department</th>
            <th className='px-4 py-3'>Position</th>
            <th className='px-4 py-3 text-right'>Actions</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-200'>
          {members.length === 0 ? (
            <tr>
              <td colSpan='5' className='px-4 py-8 text-center text-slate-500'>No members found.</td>
            </tr>
          ) : (
            members.map((member) => (
              <tr key={member.id}>
                <td className='px-4 py-4'>{member.name}</td>
                <td className='px-4 py-4'>{member.email}</td>
                <td className='px-4 py-4'>{member.department}</td>
                <td className='px-4 py-4'>{member.position}</td>
                <td className='px-4 py-4 text-right'>
                  <div className='flex justify-end gap-2'>
                    <Button type='button' className='bg-blue-600 hover:bg-blue-700 px-3 py-1.5' onClick={() => navigate(`/members/${member.id}`)}>
                      View
                    </Button>
                    <Button type='button' className='bg-slate-700 hover:bg-slate-600 px-3 py-1.5' onClick={() => navigate(`/members/edit/${member.id}`)}>
                      Edit
                    </Button>
                    <Button type='button' className='bg-red-600 hover:bg-red-700 px-3 py-1.5' onClick={() => handleDelete(member)}>
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

export default Members;
