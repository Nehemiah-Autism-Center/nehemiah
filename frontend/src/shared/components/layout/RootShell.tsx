import { fontVariables } from '@/shared/lib/fonts';
import { QueryProvider } from '@/providers/QueryProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

/**
 * The <html>/<body> shell shared by both root layouts (the localized public site and the
 * unlocalized scaffold pages). `lang` must be the page's real language: it drives screen-reader
 * pronunciation, hyphenation and the Amharic font stack (`:lang(am)` in globals.css).
 */
export function RootShell({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <html lang={lang} className={fontVariables} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
