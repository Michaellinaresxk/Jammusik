import { useKeyboardAnimation } from "react-native-keyboard-controller";

export default function useAnimationKeyboard() {
  const { height } = useKeyboardAnimation();

  return {
    height,
  };
}
