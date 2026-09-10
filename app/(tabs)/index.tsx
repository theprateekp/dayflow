import { useMemo, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import * as Haptics from "expo-haptics";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ScreenContainer } from "@/components/screen-container";
import { useDayflow } from "@/lib/dayflow-store";
import { useColors } from "@/hooks/use-colors";

const dayLabel = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date());

export default function HomeScreen() {
  const colors = useColors();
  const { tasks, toggleTask, addTask } = useDayflow();
  const [draft, setDraft] = useState("");
  const completed = tasks.filter((task) => task.done).length;
  const progress = tasks.length ? completed / tasks.length : 0;
  const nextTask = useMemo(() => tasks.find((task) => !task.done), [tasks]);

  const createTask = () => {
    if (!draft.trim()) return;
    addTask(draft);
    setDraft("");
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const completeTask = (id: string) => {
    toggleTask(id);
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 36 }}>
          <View className="flex-row items-center justify-between pt-3">
            <View>
              <Text className="text-xs font-bold uppercase tracking-[2px] text-primary">DAYFLOW</Text>
              <Text className="mt-2 text-3xl font-bold tracking-tight text-foreground">Good morning, Alex</Text>
              <Text className="mt-1 text-sm text-muted">{dayLabel} · a clear day starts here</Text>
            </View>
            <View className="h-11 w-11 items-center justify-center rounded-full bg-primary">
              <Text className="text-base font-bold text-background">A</Text>
            </View>
          </View>

          <View className="mt-7 rounded-[28px] bg-primary p-5">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-3">
                <Text className="text-xs font-bold uppercase tracking-[1.5px] text-[#A9E7D4]">YOUR NEXT MOVE</Text>
                <Text className="mt-2 text-2xl font-bold leading-8 text-white">{nextTask?.title ?? "You're all clear"}</Text>
                <Text className="mt-2 text-sm text-[#C5ECE0]">{nextTask ? `${nextTask.time} · ${nextTask.area}` : "Enjoy the space you've made."}</Text>
              </View>
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <MaterialIcons name="north-east" size={22} color="#FFFFFF" />
              </View>
            </View>
            <View className="mt-6 flex-row items-center justify-between">
              <View className="h-2 flex-1 overflow-hidden rounded-full bg-white/20">
                <View className="h-full rounded-full bg-[#A9E7D4]" style={{ width: `${Math.max(8, progress * 100)}%` }} />
              </View>
              <Text className="ml-3 text-xs font-semibold text-white">{completed}/{tasks.length} done</Text>
            </View>
          </View>

          <View className="mt-8 flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-bold text-foreground">Today</Text>
              <Text className="mt-1 text-sm text-muted">Small steps, visible progress.</Text>
            </View>
            <View className="rounded-full bg-[#E4F2EC] px-3 py-2">
              <Text className="text-xs font-bold text-primary">{Math.round(progress * 100)}% focused</Text>
            </View>
          </View>

          <View className="mt-4 gap-3">
            {tasks.map((task) => (
              <Pressable key={task.id} onPress={() => completeTask(task.id)} style={({ pressed }) => [{ opacity: pressed ? 0.72 : 1 }]}>
                <View className={`flex-row items-center rounded-2xl border p-4 ${task.done ? "border-[#DCEBE2] bg-[#F0F7F2]" : "border-border bg-surface"}`}>
                  <View className={`mr-3 h-7 w-7 items-center justify-center rounded-full border-2 ${task.done ? "border-primary bg-primary" : "border-[#C5D6CD] bg-transparent"}`}>
                    {task.done ? <MaterialIcons name="check" size={17} color="#FFFFFF" /> : null}
                  </View>
                  <View className="flex-1">
                    <Text className={`text-base font-semibold ${task.done ? "text-[#7B9388] line-through" : "text-foreground"}`}>{task.title}</Text>
                    <Text className="mt-1 text-xs text-muted">{task.time} · {task.area}</Text>
                  </View>
                  {task.priority === "focus" ? <View className="rounded-full bg-[#FFF1DA] px-2 py-1"><Text className="text-[10px] font-bold uppercase tracking-wide text-[#B57B28]">focus</Text></View> : null}
                </View>
              </Pressable>
            ))}
          </View>

          <View className="mt-8">
            <Text className="text-sm font-bold uppercase tracking-[1.5px] text-muted">QUICK CAPTURE</Text>
            <View className="mt-3 flex-row items-center rounded-2xl border border-border bg-surface px-4 py-1">
              <MaterialIcons name="add" size={22} color={colors.primary} />
              <TextInput
                value={draft}
                onChangeText={setDraft}
                onSubmitEditing={createTask}
                placeholder="What's on your mind?"
                placeholderTextColor={colors.muted}
                returnKeyType="done"
                className="ml-2 flex-1 py-3 text-base text-foreground"
              />
              <Pressable onPress={createTask} style={({ pressed }) => [{ opacity: pressed ? 0.55 : 1 }]}>
                <View className="rounded-xl bg-[#E4F2EC] px-3 py-2"><Text className="text-xs font-bold text-primary">Add</Text></View>
              </Pressable>
            </View>
          </View>

          <Pressable onPress={() => Alert.alert("Dayflow reflection", "You have created space for what matters today. Keep the next move small and specific.")} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
            <View className="mt-7 flex-row items-center rounded-2xl border border-[#EADFC8] bg-[#FFF9ED] p-4">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#F8E4B9]"><MaterialIcons name="lightbulb-outline" size={21} color="#9B6B24" /></View>
              <View className="flex-1"><Text className="text-sm font-bold text-[#694B20]">A gentler way to plan</Text><Text className="mt-1 text-xs leading-5 text-[#8B6D3E]">Tap any task when it’s done. Dayflow keeps the momentum visible, never overwhelming.</Text></View>
              <MaterialIcons name="chevron-right" size={21} color="#B58B4D" />
            </View>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
