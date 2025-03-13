import { FormProps } from "@/types";
import React, { useRef } from "react";

const Form: React.FC<FormProps> = ({ children, onSubmit, className }) => {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event);
        ref.current?.reset();
      }}
      ref={ref}
      className={className}
    >
      {children}
    </form>
  );
};

export default Form;
