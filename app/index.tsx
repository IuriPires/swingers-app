import Button from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function HomeScreen() {
  const router = useRouter();

  const goToLogin = useCallback(() => {
    router.push("/sign-in");
  }, [router]);

  return (
    <ThemedView style={styles.themedView}>
      <ThemedText>Home Screen</ThemedText>
      <Button onPress={goToLogin}>
        <ThemedText>Começar</ThemedText>
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  themedView: {
    flex: 1,
  },
});
