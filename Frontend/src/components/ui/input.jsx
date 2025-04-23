export function Input({ id, type = "text", placeholder = "", className = "" }) {
    return (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-md bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    );
}