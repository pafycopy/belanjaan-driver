import { create } from "zustand";

export type GpsStatus = "checking" | "ready" | "off" | "denied";

// Satu sumber kebenaran untuk tampilan menu Pesanan
export type DriverMode = "offline" | "gps-problem" | "idle" | "ready";

type DriverState = {
  isOnline: boolean; // toggle ON/OFF di header
  isReady: boolean; // tombol "siap menerima tugas" di bawah
  gpsStatus: GpsStatus;
  setOnline: (value: boolean) => void;
  setReady: (value: boolean) => void;
  setGpsStatus: (status: GpsStatus) => void;
};

export const useDriverStore = create<DriverState>((set) => ({
  isOnline: true,
  isReady: false,
  gpsStatus: "checking",

  setOnline: (value) =>
    set(value ? { isOnline: true } : { isOnline: false, isReady: false }),

  setReady: (value) =>
    set((state) => ({ isReady: state.isOnline ? value : false })),

  setGpsStatus: (gpsStatus) => set({ gpsStatus }),
}));

export const selectDriverMode = (state: DriverState): DriverMode => {
  if (!state.isOnline) return "offline";
  if (state.gpsStatus !== "ready") return "gps-problem";
  return state.isReady ? "ready" : "idle";
};