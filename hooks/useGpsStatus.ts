import { useCallback, useEffect } from "react";
import { AppState } from "react-native";
import * as Location from "expo-location";
import { useDriverStore } from "../store/driverStore";

// Mengecek izin lokasi dan status GPS, lalu menyimpannya ke store.
// Dicek ulang tiap app kembali aktif (misalnya setelah kurir menyalakan GPS).
export function useGpsStatus() {
  const setGpsStatus = useDriverStore((s) => s.setGpsStatus);

  const check = useCallback(
    async (askPermission: boolean) => {
      try {
        let { status } = await Location.getForegroundPermissionsAsync();

        if (status !== "granted" && askPermission) {
          ({ status } = await Location.requestForegroundPermissionsAsync());
        }

        if (status !== "granted") {
          setGpsStatus("denied");
          return;
        }

        const enabled = await Location.hasServicesEnabledAsync();
        setGpsStatus(enabled ? "ready" : "off");
      } catch {
        setGpsStatus("off");
      }
    },
    [setGpsStatus]
  );

  useEffect(() => {
    check(true);

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") check(false);
    });

    return () => subscription.remove();
  }, [check]);
}