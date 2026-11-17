import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { fonts } from "../constants/typography";

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export default function StatusSwitch({ value, onValueChange }: Props) {
  const label = (
    <Text style={[styles.label, value ? styles.labelOn : styles.labelOff]}>
      {value ? "ON" : "OFF"}
    </Text>
  );
  const knob = (
    <View style={[styles.knob, value ? styles.knobOn : styles.knobOff]} />
  );

  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel="Status online"
      style={[styles.track, value ? styles.trackOn : styles.trackOff]}
    >
      {value ? (
        <>
          {label}
          {knob}
        </>
      ) : (
        <>
          {knob}
          {label}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 64,
    height: 28,
    borderRadius: 14,
    paddingHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  trackOn: { backgroundColor: colors.white },
  trackOff: { backgroundColor: "rgba(255,255,255,0.35)" },
  label: { fontFamily: fonts.bold, fontSize: 11, marginHorizontal: 6 },
  labelOn: { color: colors.textPrimary },
  labelOff: { color: colors.white },
  knob: { width: 20, height: 20, borderRadius: 10 },
  knobOn: { backgroundColor: colors.primaryDark },
  knobOff: { backgroundColor: colors.white },
});