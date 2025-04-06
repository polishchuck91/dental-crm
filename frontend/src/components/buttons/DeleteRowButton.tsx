import appTheme from '@/theme';

interface DeleteRowButtonProps<T> {
  item: T;
  onDeleteOpen: (item: T) => void;
}

const DeleteRowButton = <T,>({
  item,
  onDeleteOpen,
}: DeleteRowButtonProps<T>) => {
  return (
    <button
      className={appTheme.button.danger.circle}
      onClick={() => onDeleteOpen(item)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      </svg>
    </button>
  );
};

export default DeleteRowButton;
