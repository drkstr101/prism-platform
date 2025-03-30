import type { ReactNode } from 'react';
import { Card as SparksCard } from '@bitdesign/sparks.content.card';

export type CardProps = {
  /**
   * sets the component children.
   */
  children?: ReactNode;
};

export function Card({ children }: CardProps) {
  return <SparksCard>{children}</SparksCard>;
}
