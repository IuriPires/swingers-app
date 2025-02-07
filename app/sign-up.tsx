import Button from "@/components/Button";
import Input from "@/components/Input";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useUsers } from "@/hooks/useUsers";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SignUp() {
  const router = useRouter();
  const {
    createUser,
    isLoading: isRegistering,
    error: registerError,
  } = useUsers();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleRegister = useCallback(() => {
    createUser(
      {
        name,
        email,
        username,
        password,
        birthDate,
      },
      {
        onSuccess: () => {
          // Redirect to main app screen after successful registration
          console.log("Registered successfully");
          router.replace("/");
        },
      }
    );
  }, [name, email, username, password, birthDate, createUser, router]);

  const navigateBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.mainContainer}>
      <Button icon onPress={navigateBack}>
        <IconSymbol name="arrow.backward" size={24} color="#fff" />
      </Button>

      <View style={styles.inputs}>
        <ThemedText type="subtitle">Criar Conta</ThemedText>

        <Input
          placeholder="Digite seu nome completo"
          value={name}
          onChangeText={setName}
        />

        <Input
          keyboardType="email-address"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Input
          placeholder="Digite seu nome de usuário"
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

        <Input
          placeholder="Data de nascimento (YYYY-MM-DD)"
          value={birthDate}
          onChangeText={setBirthDate}
          keyboardType="numbers-and-punctuation"
        />

        {registerError && (
          <ThemedText style={styles.errorText}>
            {registerError instanceof Error
              ? registerError.message
              : "Erro ao criar conta"}
          </ThemedText>
        )}

        <Button onPress={handleRegister} disabled={isRegistering}>
          <ThemedText
            darkColor={Colors.light.text}
            lightColor={Colors.dark.text}
          >
            {isRegistering ? "Criando conta..." : "Criar conta"}
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
