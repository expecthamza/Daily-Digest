import './globals.css';

export const metadata = {
  title: 'Daily Digest',
  description: 'Understand your body, one day at a time.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
