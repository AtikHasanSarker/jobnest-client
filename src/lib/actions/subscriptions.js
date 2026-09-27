'use server'

import { serverMutation } from "../api/core/server";

export const createSubscription = async (subInfo) => {
  return serverMutation('subscriptions', subInfo);
};