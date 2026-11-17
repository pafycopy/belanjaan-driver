import { Linking, Pressable, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { fonts } from "../constants/typography";
import { GpsStatus, useDriverStore } from "../store/driverStore";

const LABELS: Record<GpsStatus, string> = {
  checking: "Mencari GPS",
  ready: "GPS Siap",
  off: "GPS Mati",
  denied: "Izin Lokasi",
};

export default function GpsPill() {
  const gpsStatus = useDriverStore((s) => s.gpsStatus);
  const isReady = gpsStatus === "ready";

  return (
    <Pressable
      onPress={isReady ? undefined : () => Linking.openSettings()}
      style={styles.pill}
      accessibilityLabel={`Status GPS: ${LABELS[gpsStatus]}`}
    >
      <MaterialCommunityIcons
        name={isReady ? "map-marker-outline" : "map-marker-off-outline"}
        size={15}
        color={isReady ? colors.primaryDark : colors.danger}
      />
      <Text style={styles.text}>{LABELS[gpsStatus]}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  text: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: colors.textPrimary,
  },
});