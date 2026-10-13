import { getUsersList } from '@/lib/actions/users';
import React from 'react';

const AdminUsersPage = async () => {
    const data = await getUsersList();
    const users = data.users;
    return (
        <div>
            <h2>Admin Users Page</h2>
            <p>Users: {users.length}</p>
        </div>
    );
};

export default AdminUsersPage;