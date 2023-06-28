import { useState, InputHTMLAttributes } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  secureTextEntry?: boolean;
  validateInput?: (value: string) => boolean;
  errorMessage?: string;
}

export function Input({ name, label, placeholder, required=false, secureTextEntry=false, validateInput, errorMessage, ...rest }: InputProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (validateInput && !validateInput(newValue)) {
      setError(errorMessage || "Invalid input.");
    } else {
      setError("");
    }
  };

  return (
    <div className="flex flex-col mb-4 relative">
      <label htmlFor={name} className="mb-1 text-md">{label} {required && <span className="text-red-500">*</span>}</label>
      <input
        className={`rounded-sm border-2 px-3 py-2 ${error ? 'border-red-500' : 'border-gray-200'}`}
        id={name}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        required={required}
        type={secureTextEntry && !visible ? "password" : "text"}
        onChange={handleInputChange}
        {...rest}
      />
      {secureTextEntry && (
        <button
          type="button"
          className="absolute right-4 top-[70%] transform -translate-y-1/2"
          onClick={() => setVisible(!visible)}
        >
          {visible ? (
            <AiOutlineEyeInvisible className="text-gray-500" size={20} />
          ) : (
            <AiOutlineEye className="text-gray-500" size={20} />
          )}
        </button>
      )}
      {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </div>
  );
}
