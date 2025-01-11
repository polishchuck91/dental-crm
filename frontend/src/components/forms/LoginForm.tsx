import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginValidationSchema } from "../../validations";

interface FormData {
  email: string;
  password: string;
}

const LoginForm: FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data Submitted: ", data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          OralHUB
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Електрона пошта
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Вкажіть електрону пошту"
              className="form-input w-full rounded-lg px-4 py-3"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Вкажіть пароль"
              className="form-input w-full rounded-lg px-4 py-3"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-uppercase w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-blue-600"
          >
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
