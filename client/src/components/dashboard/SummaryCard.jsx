const SummaryCard = ({ title, value, hint, accent = 'from-slate-900 to-slate-700' }) => (
  <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm'>
    <div className={`h-1.5 bg-gradient-to-r ${accent}`} />
    <div className='p-6'>
      <div className='flex items-start justify-between gap-3'>
        <div>
          <p className='text-sm font-medium text-slate-500'>{title}</p>
          <p className='mt-3 text-3xl font-semibold text-slate-900'>{value}</p>
        </div>
        <div className='rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600'>
          Live
        </div>
      </div>
      {hint && <p className='mt-3 text-sm text-slate-500'>{hint}</p>}
    </div>
  </div>
);

export default SummaryCard;
