import { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Href } from "expo-router";
import { colors } from "../constants/colors";
import { fonts } from "../constants/typography";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

type TabItem = {
  name: string; // sama dengan nama file di app/(tabs)/
  label: string;
  icon: IconName;
  href: Href;
};

const TAB_ITEMS: TabItem[] = [
  { name: "index", label: "Pesanan", icon: "moped", href: "/" },
  { name: "pendapatan", label: "Pendapatan", icon: "chart-bar", href: "/pendapatan" },
  { name: "dompet", label: "Dompet", icon: "wallet-outline", href: "/dompet" },
  { name: "profil", label: "Profile", icon: "account-circle-outline", href: "/profil" },
];

type Props = {
  activeRoute: string;
  onPress: (href: Href) => void;
};

export default function TopTabs({ activeRoute, onPress }: Props) {
  return (
    <View style={styles.container}>
      {TAB_ITEMS.map((tab) => {
        const active = tab.name === activeRoute;
        const color = active ? colors.primary : colors.textPrimary;

        return (
          <Pressable
            key={tab.name}
            style={styles.item}
            onPress={() => onPress(tab.href)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <MaterialCommunityIcons name={tab.icon} size={21} color={color} />
            <Text
              style={[
                styles.label,
                { color, fontFamily: active ? fonts.bold : fonts.medium },
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: 8, // menimpa bagian bawah header hijau
    borderRadius: 16,
    paddingVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  item: { flex: 1, alignItems: "center", gap: 3 },
  label: { fontSize: 10.5 },
});