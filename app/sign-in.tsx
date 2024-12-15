import Button from "@/components/Button";
import Input from "@/components/Input";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function SignIn() {
  const router = useRouter();

  const navigateBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.mainContainer}>
      <Button icon onPress={navigateBack}>
        <IconSymbol name="arrow.backward" size={24} color="#fff" />
      </Button>

      <View style={styles.inputs}>
        <Input keyboardType="email-address" placeholder="Digite seu e-mail" />
        <Input keyboardType="visible-password" placeholder="Digite sua senha" />
        <Button type="link">
          <ThemedText type="link">Esqueci a senha</ThemedText>
        </Button>

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
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 12,
    flex: 1,
  },
  inputs: {
    gap: 12,
    paddingTop: 18,
  },
  forgotPass: {
    alignItems: "flex-end",
  },
});
