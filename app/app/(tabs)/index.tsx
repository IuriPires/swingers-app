import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { useMatch } from "@/hooks/useMatch";
import { useEffect } from "react";
import { tokenManager } from "@/services/api";

export default function MatchesScreen() {
  const { getNextMatch, potentialMatch } = useMatch();

  async function getToken() {
    const token = await tokenManager.getToken();
    console.log(token, "TOKEN");
  }

  useEffect(() => {
    getNextMatch();
    getToken();
  }, []);

  useEffect(() => {
    console.log(potentialMatch, "MY DATA");
  }, [potentialMatch]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Matches Screen</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
