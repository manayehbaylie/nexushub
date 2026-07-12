const Button = ({ children, className = '', ...props }) => (
  <button className={`rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 ${className}`} {...props}>
    {children}
  </button>
);

export default Button;
