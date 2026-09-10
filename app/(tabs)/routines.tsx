import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import * as Haptics from "expo-haptics";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ScreenContainer } from "@/components/screen-container";
import { useDayflow } from "@/lib/dayflow-store";
import { useColors } from "@/hooks/use-colors";

export default function RoutinesScreen() {
  const colors = useColors();
  const { routines, toggleRoutine, addRoutine } = useDayflow();
  const [draft, setDraft] = useState("");
  const completed = routines.filter((routine) => routine.completed).length;

  const createRoutine = () => {
    if (!draft.trim()) return;
    addRoutine(draft);
    setDraft("");
  };

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 36 }}>
        <View className="pt-3">
          <Text className="text-xs font-bold uppercase tracking-[2px] text-primary">RHYTHM</Text>
          <Text className="mt-2 text-3xl font-bold tracking-tight text-foreground">Your routines</Text>
          <Text className="mt-1 text-sm leading-5 text-muted">Consistency is easier when the next cue is already waiting.</Text>
        </View>

        <View className="mt-7 flex-row rounded-[26px] bg-[#E4F2EC] p-5">
          <View className="flex-1"><Text className="text-xs font-bold uppercase tracking-[1.5px] text-primary">TODAY’S RHYTHM</Text><Text className="mt-2 text-3xl font-bold text-primary">{completed}/{routines.length}</Text><Text className="mt-1 text-sm text-[#51776A]">routines complete</Text></View>
          <View className="h-16 w-16 items-center justify-center rounded-full border-[6px] border-[#A9D8C2]"><MaterialIcons name="auto-graph" size={25} color={colors.primary} /></View>
        </View>

        <View className="mt-8 flex-row items-center justify-between"><Text className="text-xl font-bold text-foreground">Daily anchors</Text><Text className="text-xs font-semibold text-muted">Tap to complete</Text></View>
        <View className="mt-4 gap-3">
          {routines.map((routine) => (
            <Pressable key={routine.id} onPress={() => { toggleRoutine(routine.id); if (routine.completed === false) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }} style={({ pressed }) => [{ opacity: pressed ? 0.72 : 1 }]}>
              <View className={`flex-row items-center rounded-2xl border p-4 ${routine.completed ? "border-[#DCEBE2] bg-[#F0F7F2]" : "border-border bg-surface"}`}>
                <View className={`mr-3 h-11 w-11 items-center justify-center rounded-2xl ${routine.completed ? "bg-primary" : "bg-[#EEF3EF]"}`}><MaterialIcons name={routine.completed ? "check" : "wb-sunny"} size={22} color={routine.completed ? "#FFFFFF" : colors.primary} /></View>
                <View className="flex-1"><Text className={`text-base font-semibold ${routine.completed ? "text-[#7B9388]" : "text-foreground"}`}>{routine.title}</Text><Text className="mt-1 text-xs text-muted">{routine.detail}</Text></View>
                <View className="items-end"><Text className="text-sm font-bold text-primary">{routine.streak}</Text><Text className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted">day streak</Text></View>
              </View>
            </Pressable>
          ))}
        </View>

        <Text className="mt-8 text-sm font-bold uppercase tracking-[1.5px] text-muted">ADD ANCHOR</Text>
        <View className="mt-3 flex-row items-center rounded-2xl border border-border bg-surface px-4 py-1"><MaterialIcons name="add" size={22} color={colors.primary} /><TextInput value={draft} onChangeText={setDraft} onSubmitEditing={createRoutine} placeholder="e.g. Read 10 pages" placeholderTextColor={colors.muted} returnKeyType="done" className="ml-2 flex-1 py-3 text-base text-foreground" /><Pressable onPress={createRoutine} style={({ pressed }) => [{ opacity: pressed ? 0.55 : 1 }]}><View className="rounded-xl bg-[#E4F2EC] px-3 py-2"><Text className="text-xs font-bold text-primary">Add</Text></View></Pressable></View>

        <Pressable onPress={() => Alert.alert("Keep it kind", "The goal is not a perfect streak. It is making the next helpful action easier to see.")} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}><View className="mt-7 flex-row items-center rounded-2xl bg-[#19312B] p-4"><View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#31534A]"><MaterialIcons name="favorite-border" size={21} color="#A9E7D4" /></View><View className="flex-1"><Text className="text-sm font-bold text-white">Progress, not perfection</Text><Text className="mt-1 text-xs leading-5 text-[#C5ECE0]">Missed a day? Your routine is still yours. Start with the next cue.</Text></View><MaterialIcons name="chevron-right" size={21} color="#A9E7D4" /></View></Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}
