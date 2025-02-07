import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileScreen() {
  const router = useRouter();
  const { logout: loggoutUser } = useAuth();

  const logout = useCallback(() => {
    loggoutUser();
    router.push("/");
  }, [router]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Profile Screen</ThemedText>

      <ThemedView style={styles.logout}>
        <ThemedText onPress={logout} type="link">
          Sair
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    padding: 16,
  },
  logout: {
    position: "absolute",
    bottom: 0,
    padding: 16,
  },
});
