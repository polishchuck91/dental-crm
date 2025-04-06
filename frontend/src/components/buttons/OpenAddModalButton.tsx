import appTheme from '@/theme';
import { FC } from 'react';
import AddIcon from '../icons/AddIcon';

interface AddButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

const OpenAddModalButton: FC<AddButtonProps> = ({
  onClick,
  label = 'Додати',
  className,
}) => {
  return (
    <button
      type="button"
      className={`${appTheme.button.primary.outline} ${className ?? ''}`}
      onClick={onClick}
    >
      <AddIcon />
      <span className="ml-2">{label}</span>
    </button>
  );
};

export default OpenAddModalButton;
