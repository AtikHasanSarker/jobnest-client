'use server'

import { protectedServerFetch, serverMutation } from "../api/core/server";

export const submitApplication = async (applicationData) => {
  return serverMutation('applications', applicationData);
};

export const getApplicationsByApplicant = async (applicantId) => {
  return protectedServerFetch(`applications?applicantId=${applicantId}`);
};