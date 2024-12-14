import { Image, StyleSheet, Platform, View, SafeAreaView } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import Input from "@/components/Input";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ThemedView style={styles.mainContainer}>
        <ThemedView style={styles.content}>
          <ThemedView style={styles.mainContainer}>
            <View style={styles.inputs}>
              <Input placeholder="Digite seu e-mail" />
              <Input placeholder="Digite sua senha" />
              <Button>
                <ThemedText
                  darkColor={Colors.light.text}
                  lightColor={Colors.dark.text}
                >
                  Entrar
                </ThemedText>
              </Button>
            </View>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputs: {
    gap: 12,
  },
  mainContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    borderStyle: "dashed",
    borderWidth: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
