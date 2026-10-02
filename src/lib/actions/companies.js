'use server'

import { revalidatePath } from "next/cache";
import { serverFetch, serverMutation } from "../api/core/server"
import { getUserSession } from "../api/core/session";

export const createCompany = async (newCompanyData) => {
  return serverMutation('companies', newCompanyData);
};

export const getCompanies = async () => {
  return serverFetch("companies");
}

export const getRecruiterCompany = async (recruiterId) => {
  if (!recruiterId) return null;
  return serverFetch(`my/company?recruiterId=${recruiterId}`);
};

export const getLoggedRecruiterCompany = async () => {
  const user = await getUserSession();
  return getRecruiterCompany(user?.id);
}

export const updateCompany = async (id, data) => {

  const result = await serverMutation(`companies/${id}`, data, 'PATCH');
  revalidatePath("/dashboard/admin/companies");
  return result;
};