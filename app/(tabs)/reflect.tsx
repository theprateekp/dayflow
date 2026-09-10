import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ScreenContainer } from "@/components/screen-container";
import { useDayflow } from "@/lib/dayflow-store";

const week = [
  { label: "M", value: 72 }, { label: "T", value: 58 }, { label: "W", value: 86 }, { label: "T", value: 64 }, { label: "F", value: 78 }, { label: "S", value: 42 }, { label: "S", value: 0 },
];

export default function ReflectScreen() {
  const { tasks, routines } = useDayflow();
  const completed = tasks.filter((task) => task.done).length + routines.filter((routine) => routine.completed).length;
  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 36 }}>
        <View className="pt-3"><Text className="text-xs font-bold uppercase tracking-[2px] text-primary">LOOK BACK</Text><Text className="mt-2 text-3xl font-bold tracking-tight text-foreground">A little perspective</Text><Text className="mt-1 text-sm leading-5 text-muted">Notice what is working. Carry only the useful parts forward.</Text></View>
        <View className="mt-7 rounded-[26px] bg-[#19312B] p-5"><Text className="text-xs font-bold uppercase tracking-[1.5px] text-[#A9E7D4]">THIS WEEK</Text><Text className="mt-2 text-3xl font-bold text-white">You showed up {completed} times</Text><Text className="mt-2 text-sm leading-5 text-[#C5ECE0]">Every completed task is evidence that your plan can meet you where you are.</Text><View className="mt-7 flex-row items-end justify-between" style={{ height: 92 }}>{week.map((day) => <View key={`${day.label}-${day.value}`} className="items-center"><View className="w-7 rounded-t-xl bg-[#74C7AC]" style={{ height: Math.max(8, day.value * 0.72), opacity: day.value === 0 ? 0.2 : 1 }} /><Text className="mt-2 text-[10px] font-bold text-[#9ACFBD]">{day.label}</Text></View>)}</View></View>
        <Text className="mt-8 text-xl font-bold text-foreground">Try a softer reset</Text>
        <Text className="mt-1 text-sm leading-5 text-muted">Choose one prompt for tonight. No journaling streak required.</Text>
        <View className="mt-4 gap-3"><Pressable onPress={() => Alert.alert("Reflection prompt", "What felt easier than expected today?")} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}><View className="flex-row items-center rounded-2xl border border-border bg-surface p-4"><View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#E4F2EC]"><MaterialIcons name="sentiment-satisfied-alt" size={21} color="#174A43" /></View><View className="flex-1"><Text className="text-sm font-bold text-foreground">What felt easier than expected?</Text><Text className="mt-1 text-xs text-muted">Find the clue worth repeating.</Text></View><MaterialIcons name="chevron-right" size={21} color="#78908A" /></View></Pressable><Pressable onPress={() => Alert.alert("Tomorrow's cue", "What is the smallest first move that would make tomorrow kinder?")} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}><View className="flex-row items-center rounded-2xl border border-border bg-surface p-4"><View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#FFF1DA]"><MaterialIcons name="wb-sunny" size={21} color="#B57B28" /></View><View className="flex-1"><Text className="text-sm font-bold text-foreground">What deserves a head start tomorrow?</Text><Text className="mt-1 text-xs text-muted">Leave yourself one clear cue.</Text></View><MaterialIcons name="chevron-right" size={21} color="#78908A" /></View></Pressable></View>
        <View className="mt-8 rounded-2xl border border-[#DCEBE2] bg-[#F0F7F2] p-4"><Text className="text-sm font-bold text-primary">Your Dayflow principle</Text><Text className="mt-2 text-sm leading-5 text-[#51776A]">Make the next good action obvious, then let the rest of the day breathe.</Text></View>
      </ScrollView>
    </ScreenContainer>
  );
}
