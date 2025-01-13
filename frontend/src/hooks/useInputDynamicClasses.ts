import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export const useInputDynamicClasses = (isHasError: boolean) => {
  const labelClasses = useMemo(
    () =>
      twMerge(
        "mb-2 block text-sm font-medium",
        isHasError ? "text-red-600" : "text-gray-600",
      ),
    [isHasError],
  );

  const inputClasses = useMemo(
    () =>
      twMerge(
        "form-input w-full rounded-lg px-4 py-3 transition duration-200",
        isHasError
          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:border-gray-400",
      ),
    [isHasError],
  );

  return { labelClasses, inputClasses };
};
