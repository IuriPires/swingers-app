import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";

// Types
interface User {
  id: string;
  name: string;
  birthDate: string;
  email: string;
  username: string;
}

interface PotentialMatch {
  id: string;
  name: string;
  birthDate: string;
  username: string;
  age: number;
  bio?: string;
  // Add other user profile fields you want to show in the matching interface
  // but exclude sensitive information like email, password, etc.
}

interface Match {
  id: string;
  user1: User;
  user2: User;
  createdAt: string;
  // Add any other match-specific fields
}

// Custom hook for match functionality
export function useMatch() {
  const queryClient = useQueryClient();

  // Get next potential match query
  const nextMatchQuery = useQuery({
    queryKey: ["nextMatch"],
    queryFn: () => api.get<PotentialMatch>("/matches/next"),
    // Don't automatically refetch as we want to control when to get the next match
    refetchOnWindowFocus: true,
  });

  // Get all matches query
  const matchesQuery = useQuery({
    queryKey: ["matches"],
    queryFn: () => api.get<Match[]>("/matches"),
  });

  // Like user mutation
  const likeMutation = useMutation({
    mutationFn: (userId: string) => api.post(`/matches/${userId}/like`),
    onSuccess: (data) => {
      // After liking, we want to get the next potential match
      queryClient.invalidateQueries({
        queryKey: ["nextMatch"],
      });
      console.log(data, "ONLIKE DATA");
      // Also refresh the matches list as a new match might have been created
      queryClient.invalidateQueries({
        queryKey: ["matches"],
      });
    },
  });

  // Dislike user mutation
  const dislikeMutation = useMutation({
    mutationFn: (userId: string) => api.post(`/matches/${userId}/dislike`),
    onSuccess: () => {
      // After disliking, we want to get the next potential match
      queryClient.invalidateQueries({
        queryKey: ["nextMatch"],
      });
    },
  });

  // Function to manually get the next match
  const getNextMatch = () => {
    queryClient.invalidateQueries({
      queryKey: ["nextMatch"],
    });
  };

  return {
    // Next potential match
    potentialMatch: nextMatchQuery.data,
    isLoadingNext: nextMatchQuery.isLoading,
    nextMatchError: nextMatchQuery.error,
    getNextMatch,

    // Matches list
    matches: matchesQuery.data ?? [],
    isLoadingMatches: matchesQuery.isLoading,
    matchesError: matchesQuery.error,

    // Like/Dislike actions
    likeUser: likeMutation.mutate,
    isLiking: likeMutation.isPending,
    likeError: likeMutation.error,

    dislikeUser: dislikeMutation.mutate,
    isDisliking: dislikeMutation.isPending,
    dislikeError: dislikeMutation.error,
  };
}
