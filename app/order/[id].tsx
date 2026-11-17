import { useLocalSearchParams } from "expo-router";
import ScreenPlaceholder from "../../components/ScreenPlaceholder";

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ScreenPlaceholder title={`Order #${id}`} />;
}