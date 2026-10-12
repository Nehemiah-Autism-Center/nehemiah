import type { ReactNode } from 'react';

export interface ContactInfoItem {
  icon: ReactNode;
  title: string;
  lines: { text: string; href?: string }[];
}
