// src/components/ui/button.jsx

export function Button({ children, className = "", onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium ${className}`}
    >
      {children}
    </button>
  );
}
