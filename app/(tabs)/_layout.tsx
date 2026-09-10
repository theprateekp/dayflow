import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 58 + bottomPadding;

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.muted,
      tabBarButton: HapticTab,
      tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      tabBarStyle: { paddingTop: 8, paddingBottom: bottomPadding, height: tabBarHeight, backgroundColor: colors.background, borderTopColor: colors.border, borderTopWidth: 0.5 },
    }}>
      <Tabs.Screen name="index" options={{ title: "Today", tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} /> }} />
      <Tabs.Screen name="routines" options={{ title: "Routines", tabBarIcon: ({ color }) => <IconSymbol size={24} name="repeat" color={color} /> }} />
      <Tabs.Screen name="reflect" options={{ title: "Reflect", tabBarIcon: ({ color }) => <IconSymbol size={24} name="chart.bar.fill" color={color} /> }} />
    </Tabs>
  );
}
