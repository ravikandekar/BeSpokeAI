import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TabIcon = ({ focused, color, size, icon }) => {
  const getIconName = () => {
    switch (icon) {
      case 'dashboard':
        return focused ? 'grid' : 'grid-outline';
      case 'calls':
        return focused ? 'call' : 'call-outline';
      case 'people':
        return focused ? 'people' : 'people-outline';
      case 'positive':
        return focused ? 'thumbs-up' : 'thumbs-up-outline';
      case 'settings':
        return focused ? 'settings' : 'settings-outline';
      default:
        return 'ellipse-outline';
    }
  };

  return (
    <View style={styles.iconContainer}>
      <Icon
        name={getIconName()}
        size={size || 24}
        color={color}
        style={[
          styles.icon,
          focused && styles.iconFocused
        ]}
      />
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
    textAlign: 'center',
  },
  iconFocused: {
    transform: [{ scale: 1.1 }],
  },
});

export default TabIcon;
