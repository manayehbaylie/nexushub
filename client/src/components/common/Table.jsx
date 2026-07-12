const Table = ({ children }) => (
  <div className='overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm'>
    <table className='min-w-full divide-y divide-slate-200'>{children}</table>
  </div>
);

export default Table;
