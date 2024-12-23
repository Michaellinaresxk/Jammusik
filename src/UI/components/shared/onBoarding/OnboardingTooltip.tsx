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
        <View style={[styles.tooltipContainer, position, {zIndex: 1000}]}>
          <View style={styles.tooltipContent}>
            <Text style={styles.tooltipTitle}>{title}</Text>
            <Text style={styles.tooltipDescription}>{description}</Text>
            <TouchableOpacity
              style={styles.tooltipButton}
              onPress={onClose}
              activeOpacity={0.8}>
              <Text style={styles.tooltipButtonText}>Let's Go!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
