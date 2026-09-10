import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { DayflowProvider } from "@/lib/dayflow-store";
import { ThemeProvider } from "@/lib/theme-provider";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <DayflowProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }} />
        </DayflowProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
