import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
