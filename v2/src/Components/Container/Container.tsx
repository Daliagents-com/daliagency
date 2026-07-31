import React from "react";

interface Props {
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
  id?: string;
}

export default function Container({ id, children, wide, className }: Props) {
  return (
    <div
      id={id}
      className={`page-container 
      ${wide && "wide"} ${className}`}
    >
      {children}
    </div>
  );
}
