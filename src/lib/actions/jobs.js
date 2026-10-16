"use server";

import { serverFetch, serverMutation } from "../api/core/server";

export const createJob = async (newJobData) => {
  return serverMutation("jobs", newJobData);
};

export const getCompanyJobs = async (companyId, status = "active") => {
  return serverFetch(`jobs?companyId=${companyId}&status=${status}`);
};

export const getJobs = async (queryString) => {
  return serverFetch(`jobs?${queryString}`);
};

export const getJobById = async (id) => {
  return serverFetch(`jobs/${id}`);
};