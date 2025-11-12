import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TabIcon = ({ focused, color, size, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case 'dashboard':
        return focused ? '◈' : '◇';
      case 'calls':
        return focused ? '☎' : '◯';
      case 'people':
        return focused ? '◉' : '○';
      case 'positive':
        return focused ? '✦' : '✧';
      case 'settings':
        return focused ? '⚙' : '○';
      default:
        return '○';
    }
  };

  const getIconSize = () => {
    switch (icon) {
      case 'dashboard':
        return size * 0.9;
      case 'calls':
        return size * 1.1;
      case 'people':
        return size * 0.8;
      case 'positive':
        return size * 0.9;
      case 'settings':
        return size * 1.0;
      default:
        return size;
    }
  };

  return (
    <View style={styles.iconContainer}>
      <Text style={[
        styles.icon, 
        { 
          color, 
          fontSize: getIconSize(),
          textShadowColor: focused ? color : 'transparent',
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: focused ? 3 : 0,
        }
      ]}>
        {getIcon()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 24,
  },
  icon: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default TabIcon;
