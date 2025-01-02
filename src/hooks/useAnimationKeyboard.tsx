import {useKeyboardAnimation} from 'react-native-keyboard-controller';

export default function useAnimationKeyboard() {
  try {
    const {height} = useKeyboardAnimation();
    console.log('Keyboard height:', height);
    return {height};
  } catch (error) {
    console.error('Error in useKeyboardAnimation:', error);
    return {height: 0}; // Fallback value
  }
}
