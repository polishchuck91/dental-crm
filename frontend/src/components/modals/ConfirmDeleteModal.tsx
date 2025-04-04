import { Modal } from 'flowbite-react';
import appTheme from '@/theme';

type ConfirmDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
};

export function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  title = 'Підтвердити видалення',
  message = 'Ви впевнені, що хочете видалити цей запис? Цю дію не можна скасувати.',
  isLoading = false,
}: ConfirmDeleteModalProps) {
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
          {title}
        </Modal.Header>
        <Modal.Body onClick={handleModalClick} className="space-y-6 px-6 py-4">
          <p className="text-gray-700">{message}</p>

          <div className="flex justify-end gap-3">
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
              type="button"
              aria-label="Підтвердити видалення"
              onClick={onConfirm}
              className={
                isLoading
                  ? appTheme.button.danger.disabled
                  : appTheme.button.danger.solid
              }
              disabled={isLoading}
            >
              {isLoading ? 'Видалення...' : 'Видалити'}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
