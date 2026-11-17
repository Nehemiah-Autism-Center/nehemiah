import { Noto_Sans_Ethiopic, Open_Sans, Trirong } from 'next/font/google';

// next/font downloads these at build time and serves them from the site's own origin, so
// visitors' browsers never contact Google Fonts. Weights are limited to those actually used.
export const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const trirong = Trirong({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-trirong',
  display: 'swap',
});

// Variable font covering weights 100-900 in a single file; used for Amharic (Ethiopic script).
export const notoSansEthiopic = Noto_Sans_Ethiopic({
  subsets: ['ethiopic'],
  variable: '--font-ethiopic',
  display: 'swap',
});

export const fontVariables = `${openSans.variable} ${trirong.variable} ${notoSansEthiopic.variable}`;
