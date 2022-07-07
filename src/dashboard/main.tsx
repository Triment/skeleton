import React, { FC, ReactNode } from 'react';

// we are using memo to prevent unnecessary re render
const Main: FC<{children:ReactNode, className: string}> = ({ children, className }) => {
  return <main className={className}>{children}</main>;
}

export default Main;
