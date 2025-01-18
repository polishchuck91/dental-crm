import { forwardRef, useState } from "react";
import EyeIcon from "../../icons/EyeIcon";
import EyeSlashIcon from "../../icons/EyeSlashIcon";
import { TextfieldProps } from "../../../types/ComponentProps";
import { useInputDynamicClasses } from "../../../hooks/useInputDynamicClasses";

const PasswordField = forwardRef<HTMLInputElement, TextfieldProps>(
  (
    { errorMessage = "", label, id, placeholder = "Вкажіть пароль", ...rest },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isHasError = Boolean(errorMessage);

    const { labelClasses, inputClasses } = useInputDynamicClasses(isHasError);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    return (
      <div className="relative">
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            id={id}
            {...rest}
            placeholder={placeholder}
            aria-invalid={isHasError}
            className={inputClasses}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </div>
        {isHasError && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  },
);

export default PasswordField;
