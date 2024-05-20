import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const usePullRefresh = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { top } = useSafeAreaInsets();

  const refresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return { isRefreshing, refresh, top };
};
