import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const metadata = {
  title: 'Content Dashboard',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  if (!isAuthenticated()) {
    redirect('/admin/login');
  }
  return <AdminDashboard />;
}
