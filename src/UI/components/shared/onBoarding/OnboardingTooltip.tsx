import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalColors} from '../../../theme/Theme';
import React from 'react';

export const OnboardingTooltip = ({
  visible,
  title,
  description,
  position,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <Modal transparent>
      <TouchableOpacity
        style={styles.tooltipOverlay}
        activeOpacity={1}
        onPress={onClose}>
        <View
          style={[
            styles.tooltipContainer,
            position, // Asegúrate de que position tenga top y left
            {zIndex: 1000}, // Añade un zIndex alto para asegurar que esté por encima
          ]}>
          <View style={styles.tooltipContent}>
            <Text style={styles.tooltipTitle}>{title}</Text>
            <Text style={styles.tooltipDescription}>{description}</Text>
            <TouchableOpacity
              style={styles.tooltipButton}
              onPress={onClose}
              activeOpacity={0.8}>
              <Text style={styles.tooltipButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: globalColors.light,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: globalColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  iconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: globalColors.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: globalColors.terceary,
    textAlign: 'center',
    marginBottom: 24,
  },
  steps: {
    marginBottom: 24,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: globalColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: globalColors.light,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: globalColors.primary,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: globalColors.terceary,
  },
  button: {
    backgroundColor: globalColors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: globalColors.light,
    fontSize: 18,
    fontWeight: 'bold',
  },
  tooltipOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tooltipContainer: {
    position: 'absolute',
    width: '80%',
    maxWidth: 300,
    backgroundColor: globalColors.light,
    borderRadius: 12,
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tooltipContent: {
    alignItems: 'flex-start',
  },
  tooltipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: globalColors.primary,
    marginBottom: 8,
  },
  tooltipDescription: {
    fontSize: 14,
    color: globalColors.terceary,
    marginBottom: 16,
  },
  tooltipButton: {
    alignSelf: 'flex-end',
    backgroundColor: globalColors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  tooltipButtonText: {
    color: globalColors.light,
    fontWeight: 'bold',
  },
});
