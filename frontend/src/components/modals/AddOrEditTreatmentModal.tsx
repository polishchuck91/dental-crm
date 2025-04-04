import { Modal, Label, TextInput, Textarea } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useMemo, useState } from 'react';

import appTheme from '@/theme';
import { Treatment } from '@/types/Treatments';
import { updateTreatment } from '@/api/treatments';

type TreatmentFormValues = Omit<Treatment, 'id' | 'created_at' | 'updated_at'>;

const schema = yup.object().shape({
  treatment_name: yup.string().required('Назва обовʼязкова'),
  description: yup.string(),
  cost: yup
    .number()
    .typeError('Ціна має бути числом')
    .positive('Ціна має бути позитивною')
    .required('Ціна обовʼязкова'),
  cost_comment: yup.string(),
});

type AddOrEditTreatmentModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  treatment?: Treatment;
};

export function AddOrEditTreatmentModal({
  open,
  onClose,
  onSuccess,
  treatment,
}: AddOrEditTreatmentModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TreatmentFormValues>({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const isEditable = useMemo(() => Boolean(treatment), [treatment]);

  const resetForm = () => {
    reset({
      treatment_name: treatment?.treatment_name ?? '',
      description: treatment?.description ?? '',
      cost_comment: treatment?.cost_comment ?? '',
      cost: treatment?.cost ?? 0,
    });
  };

  useEffect(() => {
    if (open) resetForm();
  }, [open, treatment]);

  const onSubmit = async (data: TreatmentFormValues) => {
    if (!treatment?.id || !data) return;

    try {
      setIsLoading(true);

      await updateTreatment(treatment?.id, data);
      onSuccess?.();
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <Modal show={open} size="md" onClose={onClose} popup className="z-50">
        <Modal.Header className="rounded-t-xl bg-gray-100 px-6 py-4 text-xl font-semibold text-gray-800">
          {isEditable ? 'Оновити лікування' : 'Додати нове лікування'}
        </Modal.Header>
        <Modal.Body onClick={handleModalClick} className="px-6 py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="treatment_name" value="Назва процедури" />
              <TextInput
                id="treatment_name"
                placeholder="Наприклад: Відбілювання зубів"
                {...register('treatment_name')}
                color={errors.treatment_name ? 'failure' : 'gray'}
              />
              {errors.treatment_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.treatment_name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description" value="Опис" />
              <Textarea
                id="description"
                placeholder="Опишіть процедуру"
                rows={3}
                {...register('description')}
              />
            </div>

            <div>
              <Label htmlFor="cost_comment" value="Коментар до вартості" />
              <Textarea
                id="cost_comment"
                placeholder="Наприклад: Включає консультацію"
                rows={2}
                {...register('cost_comment')}
              />
            </div>

            <div>
              <Label htmlFor="cost" value="Вартість (грн)" />
              <TextInput
                id="cost"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('cost')}
                color={errors.cost ? 'failure' : 'gray'}
              />
              {errors.cost && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.cost.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                aria-label="Скасувати"
                onClick={onClose}
                className={appTheme.button.primary.ghost}
                disabled={isLoading}
              >
                Скасувати
              </button>
              <button
                type="submit"
                aria-label={
                  isEditable ? 'Оновити лікування' : 'Зберегти лікування'
                }
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
