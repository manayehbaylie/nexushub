const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className='rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm'>
    <p className='mb-4'>{message}</p>
    <div className='flex gap-3'>
      <button className='rounded bg-emerald-600 px-4 py-2 text-white' onClick={onConfirm}>Confirm</button>
      <button className='rounded border border-slate-300 px-4 py-2 text-slate-700' onClick={onCancel}>Cancel</button>
    </div>
  </div>
);

export default ConfirmDialog;
