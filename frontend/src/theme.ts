const baseButton = 'flex items-center justify-center rounded-lg px-4 py-2 transition-colors focus:outline-none';
const baseCircleButton = 'flex items-center justify-center rounded-full w-8 h-8 transition-colors focus:outline-none';
const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';

const variantColors = {
  primary: {
    base: 'bg-primary text-white',
    hover: 'hover:bg-primary-dark',
    ring: 'focus:ring-2 focus:ring-primary',
    border: 'border-primary text-primary',
    hoverOutline: 'hover:bg-primary-light',
    hoverLink: 'hover:text-primary-dark',
  },
  secondary: {
    base: 'bg-secondary text-white',
    hover: 'hover:bg-secondary-dark',
    ring: 'focus:ring-2 focus:ring-secondary',
    border: 'border-secondary text-secondary',
    hoverOutline: 'hover:bg-secondary-light',
    hoverLink: 'hover:text-secondary-dark',
  },
  success: {
    base: 'bg-success text-white',
    hover: 'hover:bg-success-dark',
    ring: 'focus:ring-2 focus:ring-success-light',
    border: 'border-success text-success',
    hoverOutline: 'hover:bg-success-light',
    hoverLink: 'hover:text-success-dark',
  },
  danger: {
    base: 'bg-danger text-white',
    hover: 'hover:bg-danger-dark',
    ring: 'focus:ring-2 focus:ring-danger-light',
    border: 'border-danger text-danger',
    hoverOutline: 'hover:bg-danger-light',
    hoverLink: 'hover:text-danger-dark',
  },
  info: {
    base: 'bg-info text-white',
    hover: 'hover:bg-info-dark',
    ring: 'focus:ring-2 focus:ring-info-light',
    border: 'border-info text-info',
    hoverOutline: 'hover:bg-info-light',
    hoverLink: 'hover:text-info-dark',
  },
};

const getSolidVariant = (type: keyof typeof variantColors, disabled = false) => {
  const color = variantColors[type];
  return `${baseButton} ${color.base} ${disabled ? disabledClasses : `${color.hover} ${color.ring}`}`;
};

const getOutlineVariant = (type: keyof typeof variantColors, disabled = false) => {
  const color = variantColors[type];
  return `${baseButton} border ${color.border} bg-transparent ${disabled ? disabledClasses : color.hoverOutline}`;
};

const getGhostVariant = (type: keyof typeof variantColors, disabled = false) => {
  const color = variantColors[type];
  return `${baseButton} text-${type} bg-transparent ${disabled ? disabledClasses : color.hoverOutline}`;
};

const getLinkVariant = (type: keyof typeof variantColors, disabled = false) => {
  const color = variantColors[type];
  return `${baseButton} p-0 h-auto text-${type} bg-transparent underline ${disabled ? disabledClasses : color.hoverLink}`;
};

const appTheme = {
  button: {
    primary: {
      solid: getSolidVariant('primary'),
      outline: getOutlineVariant('primary'),
      ghost: getGhostVariant('primary'),
      link: getLinkVariant('primary'),
      disabled: getSolidVariant('primary', true),
    },
    secondary: {
      solid: getSolidVariant('secondary'),
      outline: getOutlineVariant('secondary'),
      ghost: getGhostVariant('secondary'),
      link: getLinkVariant('secondary'),
      disabled: getSolidVariant('secondary', true),
    },
    success: {
      solid: getSolidVariant('success'),
      outline: getOutlineVariant('success'),
      ghost: getGhostVariant('success'),
      link: getLinkVariant('success'),
      disabled: getSolidVariant('success', true),
    },
    danger: {
      solid: getSolidVariant('danger'),
      outline: getOutlineVariant('danger'),
      ghost: getGhostVariant('danger'),
      link: getLinkVariant('danger'),
      disabled: getSolidVariant('danger', true),
    },
    info: {
      solid: getSolidVariant('info'),
      outline: getOutlineVariant('info'),
      ghost: getGhostVariant('info'),
      link: getLinkVariant('info'),
      disabled: getSolidVariant('info', true),
    },
    circle: `${baseCircleButton} bg-transparent text-primary hover:bg-primary-light`,
  },
};

export default appTheme;
