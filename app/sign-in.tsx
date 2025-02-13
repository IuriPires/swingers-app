import Button from "@/components/Button";
import Input from "@/components/Input";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SignIn() {
  const router = useRouter();
  const { login, isLoggingIn, loginError } = useUsers();
  const { login: setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useCallback(() => {
    login(
      { username, password },
      {
        onSuccess: (data) => {
          // Update auth state
          setAuth(data);
          // Redirect to main app screen after successful login
          router.replace("/app");
        },
      }
    );
  }, [username, password, login, router, setAuth]);

  const navigateBack = () => {
    router.back();
  };

  const navigateToForgotPass = useCallback(() => {
    router.push("/forgot-password");
  }, [router]);

  return (
    <ThemedView style={styles.mainContainer}>
      <Button icon onPress={navigateBack}>
        <IconSymbol name="arrow.backward" size={24} color="#fff" />
      </Button>

      <View style={styles.inputs}>
        <ThemedText type="subtitle">Entrar</ThemedText>

        <Input
          keyboardType="email-address"
          placeholder="Digite seu e-mail"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Input
          secureTextEntry
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
        />

        {loginError && (
          <ThemedText style={styles.errorText}>
            {loginError instanceof Error
              ? loginError.message
              : "Erro ao fazer login"}
          </ThemedText>
        )}

        <Button type="link" onPress={navigateToForgotPass}>
          <ThemedText type="link">Esqueci a senha</ThemedText>
        </Button>

        <Button onPress={handleLogin} disabled={isLoggingIn}>
          <ThemedText
            darkColor={Colors.light.text}
            lightColor={Colors.dark.text}
          >
            {isLoggingIn ? "Entrando..." : "Entrar"}
          </ThemedText>
        </Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 12,
  },
  inputs: {
    gap: 12,
    marginTop: 32,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 14,
    textAlign: "center",
  },
});
