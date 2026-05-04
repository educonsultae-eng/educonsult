import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'EduConsult — Premium Education Consultancy in Dubai',
    template: '%s | EduConsult',
  },
  description: 'Leading education consultancy in the GCC region. We help schools achieve KHDA excellence, improve curriculum, and develop outstanding leadership.',
  keywords: ['education consultancy', 'Dubai', 'KHDA', 'school improvement', 'GCC', 'UAE'],
  authors: [{ name: 'EduConsult' }],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: 'EduConsult',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
