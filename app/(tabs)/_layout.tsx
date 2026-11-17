import { View } from "react-native";
import { Tabs, useRouter } from "expo-router";
import AppHeader from "../../components/AppHeader";
import TopTabs from "../../components/TopTabs";
import { useGpsStatus } from "../../hooks/useGpsStatus";

export default function TabsLayout() {
  const router = useRouter();
  useGpsStatus();

  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarPosition: "top" }}
      tabBar={(props) => {
        const activeRoute = props.state.routes[props.state.index].name;

        return (
          <View>
            <AppHeader />
            <TopTabs
              activeRoute={activeRoute}
              onPress={(href) => router.navigate(href)}
            />
          </View>
        );
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="pendapatan" />
      <Tabs.Screen name="dompet" />
      <Tabs.Screen name="profil" />
    </Tabs>
  );
}