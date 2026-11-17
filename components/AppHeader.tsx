import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/colors";
import { useDriverStore } from "../store/driverStore";
import GpsPill from "./GpsPill";
import StatusSwitch from "./StatusSwitch";

export default function AppHeader() {
  const insets = useSafeAreaInsets();
  const isOnline = useDriverStore((s) => s.isOnline);
  const setOnline = useDriverStore((s) => s.setOnline);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.left}>
        <GpsPill />
        {/* TODO: buka halaman notifikasi */}
        <Pressable hitSlop={8} accessibilityLabel="Notifikasi">
          <MaterialCommunityIcons
            name="bell-outline"
            size={21}
            color={colors.headerIcon}
          />
        </Pressable>
      </View>

      <StatusSwitch value={isOnline} onValueChange={setOnline} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 16, // ruang untuk tab bar yang menimpa header
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: { flexDirection: "row", alignItems: "center", gap: 12 },
});