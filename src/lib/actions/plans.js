'use server'

import { serverFetch } from "../api/core/server"

export const getPlanById = async (planId) => {
    return serverFetch(`plans?plan_id=${planId}`)
}