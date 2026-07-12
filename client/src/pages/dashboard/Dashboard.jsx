import { useEffect, useState } from 'react';
import SummaryCard from '../../components/dashboard/SummaryCard';
import RecentActivity from '../../components/dashboard/RecentActivity';
import Charts from '../../components/dashboard/Charts';
import { fetchDashboardSummary } from '../../services/dashboardService';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchDashboardSummary()
      .then((data) => {
        if (isMounted) setSummary(data);
      })
      .catch((error) => {
        if (!isMounted) return;
        console.error(error);
        setSummary({
          members: 0,
          requests: 0,
          resources: 0,
          activities: [],
          completedRequests: 0,
          pendingRequests: 0,
          inProgressRequests: 0,
          availableResources: 0,
          inUseResources: 0,
          activeMembers: 0,
          membersByDepartment: [],
          requestsByStatus: [],
          resourcesByCategory: [],
        });
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className='space-y-6'>
      <div className='rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-sm'>
        <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.24em] text-slate-300'>Operations center</p>
            <h1 className='mt-2 text-3xl font-semibold'>Smart Operations Management Portal</h1>
            <p className='mt-2 max-w-2xl text-sm text-slate-300'>Monitor members, requests, and resources from one executive-ready dashboard.</p>
          </div>
          <div className='rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm backdrop-blur'>
            <p className='font-medium'>Status</p>
            <p className='mt-1 text-slate-200'>All systems operational</p>
          </div>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        <SummaryCard title='Total Team Members' value={loading ? '—' : summary?.members || 0} hint='All registered team members' accent='from-emerald-500 to-emerald-600' />
        <SummaryCard title='Total Work Requests' value={loading ? '—' : summary?.requests || 0} hint='All tracked requests in the system' accent='from-blue-500 to-blue-600' />
        <SummaryCard title='Total Resources' value={loading ? '—' : summary?.resources || 0} hint='Registered resources and assets' accent='from-violet-500 to-violet-600' />
        <SummaryCard title='Completed Requests' value={loading ? '—' : summary?.completedRequests || 0} hint='Work items already closed' accent='from-slate-500 to-slate-700' />
        <SummaryCard title='Pending Requests' value={loading ? '—' : summary?.pendingRequests || 0} hint='Awaiting attention' accent='from-amber-500 to-amber-600' />
        <SummaryCard title='Active Members' value={loading ? '—' : summary?.activeMembers || 0} hint='Members currently active' accent='from-cyan-500 to-cyan-600' />
      </div>

      <div className='grid gap-6 xl:grid-cols-[1.15fr_0.85fr]'>
        <Charts
          membersByDepartment={summary?.membersByDepartment || []}
          requestsByStatus={summary?.requestsByStatus || []}
          resourcesByCategory={summary?.resourcesByCategory || []}
        />
        <RecentActivity items={summary?.activities || []} />
      </div>
    </div>
  );
};

export default Dashboard;
