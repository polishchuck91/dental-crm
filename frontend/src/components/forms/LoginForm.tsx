import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginValidationSchema } from "../../validations";
import { twMerge } from "tailwind-merge";
import Textfield from "./fields/Textfield";
import PasswordField from "./fields/PasswordField";

interface FormData {
  email: string;
  password: string;
}

const LoginForm: FC = (): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(loginValidationSchema),
  });

  const buttonClasses = useMemo(
    () =>
      twMerge(
        "w-full rounded-lg px-4 py-2 font-semibold uppercase text-white transition duration-200",
        loading
          ? "cursor-not-allowed bg-gray-400"
          : "bg-blue-500 hover:bg-blue-600",
      ),
    [loading],
  );

  // Form submission handler
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form Data Submitted:", data);
      reset(); // Reset form fields
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl text-gray-800">
          <span className="font-medium">Dental</span>
          <span className="font-bold text-blue-500">HUB</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <Textfield
              id="email"
              type="email"
              label="Логін або електрона пошта"
              placeholder="Вкажіть електрону пошту або логін"
              errorMessage={errors.email?.message}
              {...register("email")}
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <PasswordField
              id="password"
              label="Пароль"
              placeholder="Вкажіть пароль"
              errorMessage={errors.password?.message}
              {...register("password")}
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Пам'ятати мене?</span>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} className={buttonClasses}>
            {loading ? "Завантаження..." : "Увійти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
