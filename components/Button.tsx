import { type ReactNode } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

interface ButtonProps {
  children: ReactNode;
  borderRadius?: number;
}

export default function Button({
  children,
  borderRadius = 16,
  ...rest
}: ButtonProps) {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor:
          colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
        borderRadius,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}
