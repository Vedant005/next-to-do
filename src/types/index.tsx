import { FormEvent, ReactNode } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  placeholder: string;
}

export interface FormProps {
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | React.ReactNode;
  actionButton?: boolean;
  bgColor?: string;
}

export interface todoProps {
  _id: string;
  title?: string | null;
  isCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
