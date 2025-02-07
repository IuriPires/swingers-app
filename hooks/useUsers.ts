import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, tokenManager } from "@/services/api";

// Types
interface User {
  id: string;
  name: string;
  birthDate: string;
  email: string;
  username: string;
  password?: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

// Custom hook for users
export function useUsers() {
  // Fetch users
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get<User[]>("/users"),
  });

  // Query client for cache manipulation
  const queryClient = useQueryClient();

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: (newUser: Omit<User, "id">) =>
      api.post<User>("/auth/register", newUser),
    onSuccess: () => {
      // Invalidate and refetch users query
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: (updatedUser: User) =>
      api.put<User>(`/users/${updatedUser.id}`, updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => api.delete(`/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      api.post<LoginResponse>("/auth/login", credentials),
    onSuccess: async (data) => {
      // Store the token in secure storage
      await tokenManager.setToken(data.token);
      queryClient.setQueryData(["user"], data.user);
    },
  });

  // Get current user query
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => api.get<User>("/auth/me"),
    enabled: false, // Only run when explicitly enabled
  });

  return {
    users: usersQuery.data ?? [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    error: usersQuery.error,
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    user: userQuery.data,
    isLoadingUser: userQuery.isLoading,
  };
}
