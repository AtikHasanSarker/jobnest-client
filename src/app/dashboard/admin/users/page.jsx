import UserManagement from "@/components/dashboard/admin/UserManagement";
import { getUsersList } from "@/lib/actions/users";

const AdminUsersPage = async () => {
  const data = await getUsersList();
  const users = Array.isArray(data?.users) ? data.users : [];

  return <UserManagement users={users} />;
};

export default AdminUsersPage;
