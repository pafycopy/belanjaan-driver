import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { fonts } from "../constants/typography";
import { DriverMode } from "../store/driverStore";

type Tone = "neutral" | "warning" | "success";

type Content = {
  badge: string;
  tone: Tone;
  title: string;
  subtitle: string;
};

const CONTENT: Record<DriverMode, Content> = {
  offline: {
    badge: "Offline",
    tone: "neutral",
    title: "Status Kamu Offline",
    subtitle: "Aktifkan tombol ON di bagian atas untuk mulai bekerja.",
  },
  "gps-problem": {
    badge: "GPS Belum Siap",
    tone: "warning",
    title: "Nyalakan GPS Dulu",
    subtitle:
      "Nyalakan GPS dan izinkan akses lokasi agar kami bisa mencarikan pesanan terdekat.",
  },
  idle: {
    badge: "Standby Menunggu Pesanan Antar",
    tone: "warning",
    title: "Belum Ada Pesanan Masuk",
    subtitle:
      "Pesanan dari Toko Terdekat sedang dipersiapkan di pasar. Geser tombol dibawah untuk siap menerima tugas.",
  },
  ready: {
    badge: "Siap Menerima Tugas",
    tone: "success",
    title: "Belum Ada Pesanan Masuk",
    subtitle:
      "Tetap buka aplikasi ini. Pesanan baru akan muncul otomatis begitu ada yang masuk.",
  },
};

const BADGE_STYLES: Record<Tone, { bg: string; text: string; dot: string }> = {
  neutral: { bg: colors.neutralBg, text: colors.neutralText, dot: colors.disabled },
  warning: { bg: colors.warningBg, text: colors.warningText, dot: colors.warning },
  success: { bg: colors.successBg, text: colors.successText, dot: colors.primary },
};

type Props = { mode: DriverMode };

export default function OrdersEmptyState({ mode }: Props) {
  const content = CONTENT[mode];
  const badge = BADGE_STYLES[content.tone];

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons
          name="archive-outline"
          size={48}
          color={colors.white}
        />
      </View>

      <View style={[styles.badge, { backgroundColor: badge.bg }]}>
        <View style={[styles.dot, { backgroundColor: badge.dot }]} />
        <Text style={[styles.badgeText, { color: badge.text }]}>
          {content.badge}
        </Text>
      </View>

      <Text style={styles.title}>{content.title}</Text>
      <Text style={styles.subtitle}>{content.subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingBottom: 56, // isi sedikit lebih ke atas dari tengah
  },
  iconCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  badgeText: { fontFamily: fonts.semiBold, fontSize: 10.5 },
  title: {
    fontFamily: fonts.bold,
    fontSize: 19,
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textSecondary,
    textAlign: "center",
  },
});