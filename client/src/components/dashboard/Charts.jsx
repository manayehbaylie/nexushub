import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Charts = ({ membersByDepartment = [], requestsByStatus = [], resourcesByCategory = [] }) => {
  const requestChartData = requestsByStatus.length > 0 ? requestsByStatus : [{ name: 'No data', count: 0 }];
  const memberChartData = membersByDepartment.length > 0 ? membersByDepartment : [{ name: 'No data', count: 0 }];
  const resourceChartData = resourcesByCategory.length > 0 ? resourcesByCategory : [{ name: 'No data', count: 0 }];

  return (
    <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-semibold text-slate-900'>Operations Overview</h2>
          <p className='text-sm text-slate-500'>Live distribution across requests, members, and resources</p>
        </div>
        <div className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600'>
          Live
        </div>
      </div>
      <div className='grid gap-4'>
        <div className='h-56 rounded-2xl border border-slate-100 bg-slate-50 p-3'>
          <div className='mb-2 text-sm font-semibold text-slate-700'>Requests by Status</div>
          <ResponsiveContainer width='100%' height='85%'>
            <BarChart data={requestChartData}>
              <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
              <XAxis dataKey='name' tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey='count' fill='#2563eb' radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='h-56 rounded-2xl border border-slate-100 bg-slate-50 p-3'>
          <div className='mb-2 text-sm font-semibold text-slate-700'>Members by Department</div>
          <ResponsiveContainer width='100%' height='85%'>
            <BarChart data={memberChartData}>
              <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
              <XAxis dataKey='name' tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey='count' fill='#0f766e' radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='h-56 rounded-2xl border border-slate-100 bg-slate-50 p-3'>
          <div className='mb-2 text-sm font-semibold text-slate-700'>Resources by Category</div>
          <ResponsiveContainer width='100%' height='85%'>
            <BarChart data={resourceChartData}>
              <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
              <XAxis dataKey='name' tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey='count' fill='#7c3aed' radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
