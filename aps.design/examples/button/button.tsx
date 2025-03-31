import type { ReactNode } from 'react';
import React from 'react';

export type ButtonProps = {
  /**
   * sets the component children.
   */
  children?: ReactNode;
};

export function Button({ children }: ButtonProps) {
  return (
    <button
      className="bg-primary hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out animate-in slide-in-from-top"
      type="button"
    >
      {children}
    </button>
  );
}
