const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4'>
      <div className='w-full max-w-lg rounded-3xl bg-white p-6 shadow-lg'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>{title}</h2>
          <button className='text-slate-600 hover:text-slate-900' onClick={onClose}>×</button>
        </div>
        <div className='mt-4'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
