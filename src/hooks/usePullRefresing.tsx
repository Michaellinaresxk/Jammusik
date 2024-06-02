import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const usePullRefresh = (onRefresh: () => Promise<void>) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { top } = useSafeAreaInsets();

  const refresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return { isRefreshing, refresh, top };
};
