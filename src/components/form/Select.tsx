/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  // onChange?: (value: string) => void;
  className?: string;
  // defaultValue?: string;
  register?: any;
  error?: any;
  hint?: any;
  containerClass?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  // onChange,
  className = "",
  // defaultValue = "",
  register,
  error = false,
  hint,
  containerClass = "",
  disabled = false,
}) => {
  // Manage the selected value
  // const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = e.target.value;
  //   setSelectedValue(value);
  //   onChange && onChange(value); // Trigger parent handler
  // };
  let inputClasses = `h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-800 dark:text-gray-400 ${className}`;
  if (error) {
    inputClasses += `  border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  }
  return (
    <div className={`${containerClass}`}>
      <select
        disabled={disabled}
        className={inputClasses}
        // value={selectedValue}
        // onChange={handleChange}
        defaultValue={""}
        {...register}
      >
        {/* Placeholder option */}
        <option
          value=""
          disabled
          className="text-gray-700 dark:bg-gray-900 text-gray-400 dark:text-white/90"
        >
          {placeholder}
        </option>
        {/* Map over options */}
        {options &&
          options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
            >
              {option.label}
            </option>
          ))}
      </select>
      {hint && <p className={`mt-1.5 text-xs text-error-500`}>{hint}</p>}
    </div>
  );
};

export default Select;
