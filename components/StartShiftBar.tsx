import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/colors";
import { fonts } from "../constants/typography";
import { DriverMode } from "../store/driverStore";

type Config = {
  label: string;
  caption: string;
  background: string;
  disabled: boolean;
};

const CONFIG: Record<DriverMode, Config> = {
  offline: {
    label: "Aktifkan Status Dulu",
    caption: "Geser tombol ON di bagian atas untuk mulai bekerja.",
    background: colors.disabled,
    disabled: true,
  },
  "gps-problem": {
    label: "Buka Pengaturan Lokasi",
    caption: "GPS dan izin lokasi dibutuhkan untuk menerima rute pengantaran.",
    background: colors.warning,
    disabled: false,
  },
  idle: {
    label: "Tekan ini untuk Mulai",
    caption: "Aktifkan status untuk mulai menerima rute dari Belanjaan Pasar.",
    background: colors.primaryDark,
    disabled: false,
  },
  ready: {
    label: "Berhenti Menerima Tugas",
    caption: "Kamu sedang siap menerima rute dari Belanjaan Pasar.",
    background: colors.danger,
    disabled: false,
  },
};

type Props = {
  mode: DriverMode;
  onPress: () => void;
};

export default function StartShiftBar({ mode, onPress }: Props) {
  const insets = useSafeAreaInsets();
  const config = CONFIG[mode];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 14 }]}>
      <Pressable
        onPress={onPress}
        disabled={config.disabled}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: config.background },
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>{config.label}</Text>
      </Pressable>
      <Text style={styles.caption}>{config.caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingHorizontal: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
  },
  button: {
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.85 },
  buttonText: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.white,
  },
  caption: {
    marginTop: 12,
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: "center",
  },
});