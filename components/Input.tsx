import { TextInput, useColorScheme, type TextInputProps } from "react-native";
import { Colors } from "@/constants/Colors";

interface InputProps extends TextInputProps {}

export default function Input({ ...rest }: InputProps) {
  const colorScheme = useColorScheme() as "dark" | "light";
  return (
    <TextInput
      style={{
        borderRadius: 16,
        height: 42,
        width: "100%",
        padding: 12,
        borderColor: Colors[`${colorScheme}`].inputBorder,
        backgroundColor: Colors[`${colorScheme}`].inputBackground,
        color: Colors[`${colorScheme}`].inputText,
      }}
      placeholderTextColor={Colors[`${colorScheme}`].inputText}
      {...rest}
    />
  );
}
