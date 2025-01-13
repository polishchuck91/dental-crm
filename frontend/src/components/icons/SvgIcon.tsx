import { FC, ReactNode, CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

interface SVGWrapperProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  viewBox?: string;
  xmlns?: string;
  fill?: string;
}

const SvgIcon: FC<SVGWrapperProps> = ({
  children,
  className,
  style,
  viewBox = "0 0 24 24",
  xmlns = "http://www.w3.org/2000/svg",
  fill = "currentColor",
}) => {
  return (
    <svg
      xmlns={xmlns}
      viewBox={viewBox}
      fill={fill}
      className={twMerge("size-6", className)}
      style={style}
    >
      {children}
    </svg>
  );
};

export default SvgIcon;
