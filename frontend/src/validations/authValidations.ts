import * as yup from "yup";

export const passwordValidationSchema = yup
  .string()
  .required("Це поле обов'язкове")
  .min(8, "Пароль має містити щонайменше 8 символів")
  .max(20, "Пароль не повинен перевищувати 20 символів")
  .matches(/(?=.*[A-Z])/, "Пароль має містити щонайменше одну велику літеру")
  .matches(/(?=.*[a-z])/, "Пароль має містити щонайменше одну малу літеру")
  .matches(/(?=.*[0-9])/, "Пароль має містити щонайменше одну цифру")
  .matches(
    /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
    "Пароль має містити щонайменше один спеціальний символ (!@#$%^&*()_+-=[]{};':\"|,.<>/?)",
  );

export const loginValidationSchema = yup.object({
  userIdentifier: yup.string().required("Це поле обов'язкове"),
  password: passwordValidationSchema,
});
