import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useMemo, useState, ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginValidationSchema } from "../../validations";
import { twMerge } from "tailwind-merge";
import Textfield from "./fields/Textfield";
import PasswordField from "./fields/PasswordField";
import { UserCredentials } from "../../types/Auth";
import { login } from "../../api/endpoints/auth";
import { LocalStorage } from "../../constants/storage";
import { Role } from "../../constants/roles";
import { useNavigate } from "react-router";

interface FormData extends UserCredentials {}

const LoginForm: FC = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<FormData>({
    resolver: yupResolver(loginValidationSchema),
  });

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsRemember(event.target.checked);
  };

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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    try {
      const response = await login(data);

      if (isRemember) {
        localStorage.setItem(LocalStorage.accessToken, response.accessToken);
        localStorage.setItem(LocalStorage.refreshToken, response.refreshToken);
      }

      if (response.role === Role.Patient) {
        navigate("/patient", { replace: true });
      } else {
        navigate("/crm", { replace: true });
      }

      resetForm();
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl text-gray-800">
          <span className="font-medium">Dental</span>
          <span className="font-bold text-blue-500">HUB</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Textfield
              id="userIdentifier"
              type="text"
              label="Логін або електрона пошта"
              placeholder="Вкажіть електрону пошту або логін"
              errorMessage={errors.userIdentifier?.message}
              {...register("userIdentifier")}
            />
          </div>

          <div className="mb-4">
            <PasswordField
              id="password"
              label="Пароль"
              errorMessage={errors.password?.message}
              {...register("password")}
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                checked={isRemember}
                type="checkbox"
                className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                onChange={handleCheckboxChange}
              />
              <span className="text-sm text-gray-700">Пам'ятати мене?</span>
            </label>
          </div>

          <button type="submit" disabled={loading} className={buttonClasses}>
            {loading ? "Завантаження..." : "Увійти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
