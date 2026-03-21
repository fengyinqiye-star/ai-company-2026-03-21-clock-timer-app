import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Clock - Timer & Stopwatch',
  description: 'A minimal clock, stopwatch, and countdown timer web application.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <div className="max-w-lg mx-auto px-4">{children}</div>
      </body>
    </html>
  );
}
