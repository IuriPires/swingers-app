import { type ReactNode } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

interface ButtonProps {
  children: ReactNode;
  borderRadius?: number;
  type?: "button" | "link";
}

export default function Button({
  children,
  borderRadius = 16,
  type = "button",
  ...rest
}: ButtonProps) {
  const colorScheme = useColorScheme() as "dark" | "light";

  return (
    <TouchableOpacity
      style={{
        backgroundColor:
          type === "button" ? Colors[`${colorScheme}`].tint : undefined,
        borderRadius,
        height: type === "button" ? 36 : "auto",
        justifyContent: type === "button" ? "center" : "flex-end",
        alignItems: type === "button" ? "center" : "flex-end",
        width: "100%",
        borderWidth: type === "link" ? 0 : 1,
      }}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}
