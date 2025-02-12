import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../../theme/Theme';

interface ForgotPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
}

export const ForgotPasswordModal = ({
  visible,
  onClose,
  onSubmit,
}: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      await onSubmit(email);
      setEmail('');
      // The closing of the modal is handled in the parent component
    } catch (error: any) {
      // We only set the error if the operation actually failed.
      if (error?.code !== 'auth/user-not-found') {
        setError(error.message || 'An error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="pageSheet"
      transparent={true}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}>
        <TouchableOpacity
          style={styles.modalContent}
          activeOpacity={1}
          onPress={e => e.stopPropagation()}>
          <View style={styles.handle} />
          <Text style={styles.title}>Reset Password</Text>

          <View style={styles.inputContainer}>
            <Icon name="mail" size={20} color={globalColors.primary} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor={globalColors.terceary}
              value={email}
              onChangeText={text => {
                setEmail(text);
                setError(''); // Clear error when user types
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isLoading}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[
              styles.submitButton,
              isLoading && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.submitText}>Send Reset Link</Text>
                <Icon name="arrow-forward" size={20} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 12,
    height: '80%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: globalColors.primaryDark,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.light,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: globalColors.secondary + '20',
    height: 60,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 12,
    fontSize: 16,
    color: globalColors.primaryDark,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: globalColors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
