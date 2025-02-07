import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";

// Token management
export const tokenManager = {
  getToken: () => SecureStore.getItemAsync(TOKEN_KEY),
  setToken: (token: string) => SecureStore.setItemAsync(TOKEN_KEY, token),
  removeToken: () => SecureStore.deleteItemAsync(TOKEN_KEY),
};

// Basic fetch wrapper with error handling
export async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  // You can change the baseURL here
  const baseURL = "http://192.168.1.209:3000";
  const token = await tokenManager.getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options?.headers,
  };

  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  // GET request
  get: <T>(url: string) => fetchApi<T>(url, { method: "GET" }),

  // POST request
  post: <T>(url: string, data?: any) =>
    fetchApi<T>(url, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // PUT request
  put: <T>(url: string, data?: any) =>
    fetchApi<T>(url, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // DELETE request
  delete: <T>(url: string) => fetchApi<T>(url, { method: "DELETE" }),
};
