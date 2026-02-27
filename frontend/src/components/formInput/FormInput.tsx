interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email";
  placeholder?: string;
  error?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}

export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  onKeyDown,
  autoComplete,
}: FormInputProps) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-white/90">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`rounded-xl border px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition outline-none ${
          error
            ? "border-red-500 bg-red-500/10 focus:border-red-400"
            : "border-white/20 bg-white/20 focus:border-white/40 focus:bg-white/30"
        }`}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
