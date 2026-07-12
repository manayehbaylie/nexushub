import { useEffect, useState } from 'react';
import { fetchDashboardSummary } from '../../services/dashboardService';

const Statistics = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchDashboardSummary().then(setSummary).catch(console.error);
  }, []);

  return (
    <div className='grid gap-6 md:grid-cols-2'>
      <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h1 className='text-2xl font-semibold'>Statistics</h1>
        <p className='mt-4 text-slate-700'>Total members: {summary?.members || 0}</p>
        <p className='mt-2 text-slate-700'>Total requests: {summary?.requests || 0}</p>
        <p className='mt-2 text-slate-700'>Total resources: {summary?.resources || 0}</p>
      </div>
      <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h2 className='text-xl font-semibold'>Metrics</h2>
        <div className='mt-4 space-y-3 text-slate-700'>
          <div>Total activity events: {summary?.activities?.length || 0}</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
