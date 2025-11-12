import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';

const LoadingIndicator = ({ 
  size = 'large', 
  color = '#6366f1',
  backgroundColor = 'rgba(15, 23, 42, 0.8)',
  overlay = true 
}) => {
  if (overlay) {
    return (
      <View style={[styles.overlay, { backgroundColor }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={size} color={color} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default LoadingIndicator;
