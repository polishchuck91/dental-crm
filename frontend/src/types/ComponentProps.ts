import { CSSProperties, InputHTMLAttributes } from "react";

export interface IconProps {
  className?: string;
  style?: CSSProperties;
}

export interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label: string;
  id: string;
  placeholder?: string;
}
