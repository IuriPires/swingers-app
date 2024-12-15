import { type ReactNode } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { TouchableOpacityProps } from "react-native-gesture-handler";

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  borderRadius?: number;
  type?: "button" | "link";
  icon?: boolean;
}

export default function Button({
  children,
  borderRadius = 16,
  type = "button",
  icon,
  ...rest
}: ButtonProps) {
  const colorScheme = useColorScheme() as "dark" | "light";

  if (icon) {
    return <TouchableOpacity {...rest}>{children}</TouchableOpacity>;
  }

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
