export interface InputTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  id?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function InputTextField({ label, error, className, id, placeholder, type, value, onChange, disabled, ...props }: InputTextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={className}>{label}</label>
      <input
        id={id}
        className={className}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
