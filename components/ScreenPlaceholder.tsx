import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

type Props = { title: string };

export default function ScreenPlaceholder({ title }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Halaman ini akan dibuat selanjutnya.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  title: { fontSize: 20, fontWeight: "800", color: colors.textPrimary },
  subtitle: { marginTop: 6, color: colors.textSecondary },
});