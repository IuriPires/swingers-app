import Button from "@/components/Button";
import Input from "@/components/Input";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

export default function ForgotPassword() {
  const router = useRouter();

  const navigateBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <ThemedView style={styles.mainContainer}>
      <Button icon onPress={navigateBack}>
        <IconSymbol name="arrow.backward" size={24} color="#fff" />
      </Button>

      <ThemedView style={styles.form}>
        <ThemedText type="subtitle">
          Introduza seu e-mail ou telemóvel
        </ThemedText>

        <Input
          placeholder="E-mail ou Telemóvel"
          textContentType="emailAddress"
        />

        <Button>
          <ThemedText
            darkColor={Colors.light.text}
            lightColor={Colors.dark.text}
          >
            Recuperar
          </ThemedText>
        </Button>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 18,
  },
  form: {
    flexDirection: "column",
    gap: 16,
    paddingTop: 32,
  },
});
