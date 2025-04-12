import { Modal, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState, useMemo } from 'react';
import { enqueueSnackbar } from 'notistack';

import appTheme from '@/theme';
import { Staff, StaffBase } from '@/types/Staff';
import { createStaff, updateStaff } from '@/api/endpoints/staff';
import { createPatient, updatePatient } from '@/api/endpoints/patients'; // 🆕
import { Role } from '@/constants/roles';
import { Patient } from '@/types/Patient';

function toISODate(dateStr: string): string {
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateStr)) {
    const [day, month, year] = dateStr.split('.');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return dateStr; // якщо вже ISO або інший формат
}

export type UserFormValues = StaffBase & {
  username: string;
  email: string;
  password: string;
  role: Role;
  date_of_birth?: string;
  address?: string;
};

export type FormMode = 'staff' | 'patient';

const roleLabels: Record<Role, string> = {
  [Role.Admin]: 'Адмін',
  [Role.Receptionist]: 'Реєстратор',
  [Role.Dentist]: 'Стоматолог',
  [Role.Patient]: 'Пацієнт',
  [Role.Guest]: 'Гість',
};

const schema = yup.object().shape({
  first_name: yup.string().required("Ім'я обов'язкове"),
  last_name: yup.string().required('Прізвище обов’язкове'),
  gender: yup
    .mixed<'male' | 'female'>()
    .oneOf(['male', 'female'], 'Оберіть стать')
    .required('Стать обовʼязкова'),
  contact_number: yup.string().required('Номер телефону обовʼязковий'),

  hire_date: yup.string().when('$mode', {
    is: 'staff',
    then: (schema) => schema.required('Дата найму обовʼязкова'),
    otherwise: (schema) => schema.notRequired(),
  }),

  date_of_birth: yup.string().when('$mode', {
    is: 'patient',
    then: (schema) => schema.required('Дата народження обовʼязкова'),
    otherwise: (schema) => schema.notRequired(),
  }),

  username: yup.string().when('$isEditable', {
    is: false,
    then: (schema) => schema.required("Ім'я користувача обов'язкове"),
    otherwise: (schema) => schema.notRequired(),
  }),

  email: yup.string().when('$isEditable', {
    is: false,
    then: (schema) =>
      schema
        .email('Невалідна електронна адреса')
        .required('Email обовʼязковий'),
    otherwise: (schema) => schema.notRequired(),
  }),

  password: yup.string().when('$isEditable', {
    is: false,
    then: (schema) =>
      schema.required('Пароль обовʼязковий').min(6, 'Мінімум 6 символів'),
    otherwise: (schema) => schema.notRequired(),
  }),

  role: yup.mixed<Role>().when('$mode', {
    is: 'staff',
    then: (schema) =>
      schema
        .oneOf(Object.values(Role), 'Оберіть роль')
        .required('Роль обовʼязкова'),
    otherwise: (schema) => schema.notRequired(),
  }),

  address: yup.string().when('$mode', {
    is: 'patient',
    then: (schema) => schema.required('Адреса обовʼязкова'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

type AddOrEditUserModalProps = {
  mode: FormMode;
  open: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  item?: Staff | Patient;
};

export function AddOrEditUserModal({
  mode,
  open,
  onClose,
  onSuccess,
  item,
}: AddOrEditUserModalProps) {
  const isEditable = useMemo(() => Boolean(item), [item]);
  const isPatient = mode === 'patient';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UserFormValues>({
    context: { isEditable, mode },
    //@ts-ignore
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  // @ts-ignore
  const resetForm = () => {
    // @ts-ignore
    reset({
      // @ts-ignore
      first_name: item?.first_name ?? '',
      // @ts-ignore
      last_name: item?.last_name ?? '',
      // @ts-ignore
      gender: item?.gender,
      // @ts-ignore
      role: item?.user.role ?? (isPatient ? Role.Patient : ('' as Role)),
      // @ts-ignore
      contact_number: item?.contact_number ?? '',
      // @ts-ignore
      hire_date: item?.hire_date ?? '',
      // @ts-ignore
      date_of_birth: item?.date_of_birth ?? '',
      // @ts-ignore
      address: item?.address ?? '',
      // @ts-ignore
      username: '',
      // @ts-ignore
      email: '',
      // @ts-ignore
      password: '',
    });
  };

  useEffect(() => {
    if (open) resetForm();
  }, [open, item]);

  const onSubmit = async (data: UserFormValues) => {
    setIsLoading(true);

    try {
      if (isEditable && item?.id) {
        const { username, email, password, ...rest } = data;
        const payload = {
          ...rest,
          role: data.role as Role,
        };

        if (isPatient) {
          const { hire_date, ...patientData } = payload;
          //@ts-ignore
          await updatePatient(item.id, patientData);
        } else {
          //@ts-ignore
          await updateStaff(item.id, payload);
        }

        enqueueSnackbar(
          isPatient ? 'Дані пацієнта оновлено' : 'Дані співробітника оновлено',
          { variant: 'success' }
        );
      } else {
        if (isPatient) {
          const { hire_date, ...rest } = data;
          const dateOfBirth = toISODate(data.date_of_birth || '');

          //@ts-ignore
          await createPatient({
            ...rest,
            date_of_birth: dateOfBirth,
          });

          enqueueSnackbar('Пацієнта додано', { variant: 'success' });
        } else {
          await createStaff(data);
          enqueueSnackbar('Співробітника додано', { variant: 'success' });
        }
      }

      onSuccess?.();
      onClose?.();
      reset();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Не вдалося зберегти дані', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePassword = () => {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const specialChars = '!@#$%^&*';
    const randomChar = (str: string) =>
      str[Math.floor(Math.random() * str.length)];

    let password = '';
    for (let i = 0; i < 8; i++) {
      password += randomChar(chars);
    }

    const special = randomChar(specialChars);
    const insertAt = Math.floor(Math.random() * password.length);
    const finalPassword =
      password.slice(0, insertAt) + special + password.slice(insertAt);

    setValue('password', finalPassword);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}
      <Modal
        show={open}
        onClose={onClose}
        popup
        className="z-50 mx-auto w-full max-w-[800px]"
      >
        <Modal.Header className="rounded-t-xl bg-gray-100 px-6 py-4 text-xl font-semibold text-gray-800">
          {isEditable
            ? isPatient
              ? 'Оновити пацієнта'
              : 'Оновити співробітника'
            : isPatient
              ? 'Додати пацієнта'
              : 'Додати співробітника'}
        </Modal.Header>
        <Modal.Body className="px-6 py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Основна інформація */}
            <fieldset className="space-y-6">
              <legend className="border-b pb-2 text-lg font-semibold text-gray-900">
                Основна інформація
              </legend>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Прізвище */}
                <div>
                  <Label htmlFor="last_name" value="Прізвище" />
                  <TextInput
                    id="last_name"
                    {...register('last_name')}
                    color={errors.last_name ? 'failure' : 'gray'}
                  />
                  {errors.last_name && (
                    <p className="text-sm text-red-500">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>

                {/* Імʼя */}
                <div>
                  <Label htmlFor="first_name" value="Імʼя" />
                  <TextInput
                    id="first_name"
                    {...register('first_name')}
                    color={errors.first_name ? 'failure' : 'gray'}
                  />
                  {errors.first_name && (
                    <p className="text-sm text-red-500">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                {/* Стать */}
                <div>
                  <Label htmlFor="gender" value="Стать" />
                  <Select
                    id="gender"
                    {...register('gender')}
                    color={errors.gender ? 'failure' : 'gray'}
                  >
                    <option value="">Оберіть стать</option>
                    <option value="male">Чоловіча</option>
                    <option value="female">Жіноча</option>
                  </Select>
                  {errors.gender && (
                    <p className="text-sm text-red-500">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                {/* Роль */}
                {mode === 'staff' && (
                  <div>
                    <Label htmlFor="role" value="Роль" />
                    <Select
                      id="role"
                      {...register('role')}
                      color={errors.role ? 'failure' : 'gray'}
                    >
                      <option value="">Оберіть роль</option>
                      {Object.values(Role).map((role) => (
                        <option key={role} value={role}>
                          {roleLabels[role]}
                        </option>
                      ))}
                    </Select>
                    {errors.role && (
                      <p className="text-sm text-red-500">
                        {errors.role.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Телефон */}
                <div>
                  <Label htmlFor="contact_number" value="Номер телефону" />
                  <TextInput
                    id="contact_number"
                    {...register('contact_number')}
                    color={errors.contact_number ? 'failure' : 'gray'}
                  />
                  {errors.contact_number && (
                    <p className="text-sm text-red-500">
                      {errors.contact_number.message}
                    </p>
                  )}
                </div>

                {/* Дата найму або народження */}
                <div>
                  <Label
                    htmlFor={isPatient ? 'date_of_birth' : 'hire_date'}
                    value={isPatient ? 'Дата народження' : 'Дата найму'}
                  />
                  <TextInput
                    id={isPatient ? 'date_of_birth' : 'hire_date'}
                    type="date"
                    {...register(isPatient ? 'date_of_birth' : 'hire_date')}
                    color={
                      isPatient
                        ? errors.date_of_birth
                          ? 'failure'
                          : 'gray'
                        : errors.hire_date
                          ? 'failure'
                          : 'gray'
                    }
                  />
                  {isPatient && errors.date_of_birth && (
                    <p className="text-sm text-red-500">
                      {errors.date_of_birth.message}
                    </p>
                  )}
                  {!isPatient && errors.hire_date && (
                    <p className="text-sm text-red-500">
                      {errors.hire_date.message}
                    </p>
                  )}
                </div>

                {/* Адреса */}
                {isPatient && (
                  <div className="md:col-span-2 lg:col-span-3">
                    <Label htmlFor="address" value="Адреса" />
                    <Textarea
                      id="address"
                      {...register('address')}
                      color={errors.address ? 'failure' : 'gray'}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </fieldset>

            {/* Облікові дані */}
            {!isEditable && (
              <fieldset className="space-y-6">
                <legend className="border-b pb-2 text-lg font-semibold text-gray-900">
                  Облікові дані
                </legend>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Username */}
                  <div>
                    <Label htmlFor="username" value="Імʼя користувача" />
                    <TextInput
                      id="username"
                      {...register('username')}
                      color={errors.username ? 'failure' : 'gray'}
                    />
                    {errors.username && (
                      <p className="text-sm text-red-500">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" value="Email" />
                    <TextInput
                      id="email"
                      type="email"
                      {...register('email')}
                      color={errors.email ? 'failure' : 'gray'}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="md:col-span-2">
                    <Label htmlFor="password" value="Пароль" />
                    <div className="relative flex w-full">
                      <TextInput
                        id="password"
                        type="text"
                        {...register('password')}
                        color={errors.password ? 'failure' : 'gray'}
                        className="w-full pr-12"
                      />
                      <button
                        type="button"
                        onClick={handleGeneratePassword}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
              </fieldset>
            )}

            {/* Buttons */}
            <div className="flex flex-col-reverse justify-end gap-4 pt-6 md:flex-row">
              <button
                type="button"
                onClick={onClose}
                className={appTheme.button.primary.ghost}
                disabled={isLoading}
              >
                Скасувати
              </button>
              <button
                type="submit"
                className={
                  isLoading
                    ? appTheme.button.primary.disabled
                    : appTheme.button.primary.solid
                }
                disabled={isLoading}
              >
                {isLoading
                  ? isEditable
                    ? 'Оновлення...'
                    : 'Збереження...'
                  : isEditable
                    ? 'Оновити'
                    : 'Зберегти'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
