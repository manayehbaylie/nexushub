const formatEventLabel = (item) => {
  const action = (item.action || '').toUpperCase();
  const description = item.description || item.action || '';

  if (action.includes('CREATE') && item.entity_type === 'member') {
    return {
      title: 'New Team Member',
      detail: description || 'A new team member was added to the system.',
      badge: 'Member',
      badgeClass: 'bg-emerald-50 text-emerald-700',
    };
  }

  if (action.includes('CREATE') && item.entity_type === 'request') {
    return {
      title: 'New Work Request',
      detail: description || 'A new work request was created.',
      badge: 'Request',
      badgeClass: 'bg-blue-50 text-blue-700',
    };
  }

  if (action.includes('CREATE') && item.entity_type === 'resource') {
    return {
      title: 'Recently Added Resource',
      detail: description || 'A new resource was added to the catalog.',
      badge: 'Resource',
      badgeClass: 'bg-violet-50 text-violet-700',
    };
  }

  return {
    title: item.action || 'System Update',
    detail: description || 'A new system event was recorded.',
    badge: 'Update',
    badgeClass: 'bg-slate-100 text-slate-600',
  };
};

const RecentActivity = ({ items }) => (
  <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
    <div className='mb-4 flex items-center justify-between'>
      <div>
        <h2 className='text-lg font-semibold text-slate-900'>Recent Activities</h2>
        <p className='text-sm text-slate-500'>A running feed of what just happened</p>
      </div>
      <div className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700'>
        Live
      </div>
    </div>
    <ul className='space-y-3'>
      {items.length === 0 ? (
        <li className='rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center text-slate-500'>
          No recent activity available.
        </li>
      ) : (
        items.slice(0, 6).map((item) => {
          const event = formatEventLabel(item);
          return (
            <li key={item.id} className='rounded-2xl border border-slate-100 bg-slate-50 p-4'>
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <p className='text-sm font-semibold text-slate-800'>{event.title}</p>
                  <p className='mt-1 text-sm text-slate-600'>{event.detail}</p>
                  <p className='mt-2 text-xs text-slate-500'>
                    {item.username ? `${item.username} • ` : ''}
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${event.badgeClass}`}>
                  {event.badge}
                </span>
              </div>
            </li>
          );
        })
      )}
    </ul>
  </section>
);

export default RecentActivity;
