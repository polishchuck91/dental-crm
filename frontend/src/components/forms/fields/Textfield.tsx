import { useMemo, forwardRef } from "react";
import { TextfieldProps } from "../../../types/ComponentProps";
import { useInputDynamicClasses } from "../../../hooks/useInputDynamicClasses";

const Textfield = forwardRef<HTMLInputElement, TextfieldProps>(
  ({ errorMessage, label, id, placeholder, ...rest }, ref) => {
    const isHasError = useMemo(() => !!errorMessage, [errorMessage]);

    const { labelClasses, inputClasses } = useInputDynamicClasses(isHasError);

    return (
      <>
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          {...rest}
          placeholder={placeholder}
          aria-invalid={isHasError}
          className={inputClasses}
        />
        {isHasError && errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </>
    );
  },
);

export default Textfield;
