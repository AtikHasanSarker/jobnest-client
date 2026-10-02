import { requireRole } from '@/lib/api/core/session';

const AdminDashboardLayout = async ({ children }) => {
    await requireRole('admin');
    return children;
};

export default AdminDashboardLayout;