"use server";

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const serverFetch = async (api) => {
  const res = await fetch(`${baseUrl}/api/${api}`)
  if (!res.ok) {
    return null;
  }
  return res.json();
};

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? { Authorization: `Bearer ${token}` } : {};
  return header;
};

export const serverMutation = async (api, data, method = "POST") => {
  const res = await fetch(`${baseUrl}/api/${api}`, {
    method: method,
    headers: {
      "content-type": "application/json",
      ...await authHeader(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
