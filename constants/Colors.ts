/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#1C2024";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    inputBackground: "#e6e6e6",
    inputText: "#e8e8e8",
    inputBorder: "#f1f1f1",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    inputBackground: "#1C2024",
    inputText: "#e8e8e8",
    inputBorder: "#f1f1f1",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
