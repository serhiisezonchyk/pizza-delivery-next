import Message from '@/components/message/Message';
import './globals.css';
import 'react-toastify/ReactToastify.css'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/nav-bar/Navbar';
import Footer from '@/components/footer/Footer';
import AuthProvider from '@/components/AuthProvider';
import QueryProvider from '@/components/QueryProvider';
import { ToastContainer } from 'react-toastify';
 
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Svidoma.com',
  description: 'Доставка Неаполітанської піцци в м. Чернігів.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider>
            <div>
              <Message />
              <Navbar />
              {children}
              <Footer />
              <ToastContainer position='bottom-right' theme='light' autoClose={3000}/>
            </div>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
