import "react-native-gesture-handler";
import "react-native-reanimated";
import Button from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const router = useRouter();

  const goToLogin = useCallback(() => {
    router.push("/sign-in");
  }, [router]);

  const goToSignUp = useCallback(() => {
    router.push("/sign-up");
  }, [router]);

  return (
    <ThemedView style={styles.mainContainer}>
      <ThemedText type="title">Swingers!</ThemedText>

      <ThemedView style={styles.mainContent}>
        <Image
          source={require("@/assets/images/people.png")}
          style={styles.people}
        />

        <ThemedView style={styles.buttonsContainer}>
          <Button onPress={goToLogin}>
            <ThemedText
              darkColor={Colors.light.text}
              lightColor={Colors.dark.text}
            >
              Começar
            </ThemedText>
          </Button>

          <Button onPress={goToSignUp}>
            <ThemedText
              darkColor={Colors.light.text}
              lightColor={Colors.dark.text}
            >
              Criar conta
            </ThemedText>
          </Button>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 12,
    paddingRight: 12,
  },
  mainContent: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 4,
    paddingRight: 4,
    alignItems: "center",
  },
  people: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    marginBottom: 32,
  },
  buttonsContainer: {
    width: "100%",
    gap: 12,
  },
});
