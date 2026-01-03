const Input = ({ label, type, value, onChange, placeholder, required }) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
    />
  </div>
);

export default Input;