import { useKeyboardAnimation, KeyboardGestureArea } from "react-native-keyboard-controller";

export default function useAnimationKeyboard() {
  const { height, progress } = useKeyboardAnimation();

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1],
  });
  return {
    height, scale, KeyboardGestureArea
  }

}