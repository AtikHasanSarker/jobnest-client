'use server';

import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import { getUserSession } from "../api/core/session";
import { serverMutation } from "../api/core/server";

export const getUsersList = async () => {
    const users = await auth.api.listUsers({
      query: {
        sortBy: "name", // The field to sort by.
        sortDirection: "desc", // The direction to sort by.
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });
    return users;
};

export const updateUserRole = async (userId, role) => {
  const data = await auth.api.setRole({
    body: {
      userId,
      role
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  revalidatePath("/dashboard/admin/users");
  return data;
}

export const updateUser = async (userData) => {
  const user = await getUserSession()
  const userId = user?.id;
  return serverMutation(`users/${userId}`, userData, 'PATCH');
}