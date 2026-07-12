import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchResources, deleteResource } from '../../services/resourceService';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [filters, setFilters] = useState({ search: '', category: '', status: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const load = async (nextFilters = filters) => {
    setLoading(true);
    try {
      const data = await fetchResources(nextFilters);
      setResources(data || []);
    } catch (error) {
      console.error(error);
      alert('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(filters);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = (event) => {
    event.preventDefault();
    load(filters);
  };

  const handleReset = () => {
    const cleared = { search: '', category: '', status: '' };
    setFilters(cleared);
    load(cleared);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resource?')) return;
    try {
      await deleteResource(id);
      load(filters);
    } catch (err) {
      console.error(err);
      alert('Failed to delete resource');
    }
  };

  const summaryLabel = useMemo(() => {
    if (loading) return 'Loading resources...';
    if (resources.length === 0) return 'No resources match the current filters.';
    return `${resources.length} resources available`;
  }, [loading, resources.length]);

  return (
    <div className='space-y-5'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-semibold'>Resources</h1>
          <p className='text-sm text-slate-600'>{summaryLabel}</p>
        </div>
        <Button type='button' onClick={() => navigate('/resources/add')}>
          Add resource
        </Button>
      </div>

      <form onSubmit={handleApply} className='flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm'>
        <Input name='search' value={filters.search} onChange={handleChange} placeholder='Search by name or code' />
        <select name='category' value={filters.category} onChange={handleChange} className='rounded border border-slate-300 bg-white px-3 py-2 text-slate-800'>
          <option value=''>All categories</option>
          <option value='hardware'>Hardware</option>
          <option value='software'>Software</option>
          <option value='facility'>Facility</option>
          <option value='service'>Service</option>
        </select>
        <select name='status' value={filters.status} onChange={handleChange} className='rounded border border-slate-300 bg-white px-3 py-2 text-slate-800'>
          <option value=''>All statuses</option>
          <option value='available'>Available</option>
          <option value='in_use'>In Use</option>
          <option value='maintenance'>Maintenance</option>
          <option value='retired'>Retired</option>
        </select>
        <Button type='submit'>Apply</Button>
        <Button type='button' className='bg-slate-200 text-slate-800 hover:bg-slate-300' onClick={handleReset}>Reset</Button>
      </form>

      <Table>
        <thead className='bg-slate-100 text-left text-sm uppercase tracking-wide text-slate-600'>
          <tr>
            <th className='px-4 py-3'>Code</th>
            <th className='px-4 py-3'>Name</th>
            <th className='px-4 py-3'>Category</th>
            <th className='px-4 py-3'>Location</th>
            <th className='px-4 py-3'>Status</th>
            <th className='px-4 py-3'>Actions</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-200'>
          {resources.length === 0 ? (
            <tr>
              <td colSpan='6' className='px-4 py-8 text-center text-slate-500'>No resources found.</td>
            </tr>
          ) : (
            resources.map((resource) => (
              <tr key={resource.id}>
                <td className='px-4 py-4 font-medium text-slate-700'>{resource.resource_code}</td>
                <td className='px-4 py-4'>{resource.name}</td>
                <td className='px-4 py-4'>{resource.category}</td>
                <td className='px-4 py-4'>{resource.location || '—'}</td>
                <td className='px-4 py-4'>{resource.status}</td>
                <td className='px-4 py-4'>
                  <div className='flex flex-wrap gap-2'>
                    <Button type='button' className='bg-blue-600 hover:bg-blue-700 px-3 py-1.5' onClick={() => navigate(`/resources/${resource.id}`)}>
                      View
                    </Button>
                    <Button type='button' className='bg-slate-700 hover:bg-slate-600 px-3 py-1.5' onClick={() => navigate(`/resources/edit/${resource.id}`)}>
                      Edit
                    </Button>
                    <Button type='button' className='bg-red-600 hover:bg-red-500 px-3 py-1.5' onClick={() => handleDelete(resource.id)}>
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

export default Resources;
