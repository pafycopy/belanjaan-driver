import { Linking, StyleSheet, View } from "react-native";
import OrdersEmptyState from "../../components/OrdersEmptyState";
import StartShiftBar from "../../components/StartShiftBar";
import { colors } from "../../constants/colors";
import { selectDriverMode, useDriverStore } from "../../store/driverStore";

export default function OrdersScreen() {
  const mode = useDriverStore(selectDriverMode);
  const setReady = useDriverStore((s) => s.setReady);

  const handlePress = () => {
    if (mode === "gps-problem") {
      Linking.openSettings();
      return;
    }
    setReady(mode !== "ready");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Nanti: kalau ada order, tampilkan daftar order di sini */}
        <OrdersEmptyState mode={mode} />
      </View>
      <StartShiftBar mode={mode} onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1 },
});