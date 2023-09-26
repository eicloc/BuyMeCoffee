import './globals.css';
import Provider from '@/components/Provider';
import dynamic from 'next/dynamic';

export const metadata = {
  title: 'Buy Me A Coffee',
  description: 'Thx for your support!!!',
}

const DynamicContextProvider = dynamic(() => import('@/components/Provider').then(), {
  ssr: false
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DynamicContextProvider>{children}</DynamicContextProvider>
      </body>
    </html>
  )
}
