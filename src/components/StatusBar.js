import React from 'react';
import { StatusBar, StyleSheet, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CustomStatusBar = ({ 
  backgroundColor = '#0f172a', 
  barStyle = 'light-content',
  hidden = false 
}) => {
  const insets = useSafeAreaInsets();

  if (hidden) {
    return <StatusBar hidden={hidden} />;
  }

  return (
    <View style={[styles.statusBarContainer, { 
      backgroundColor, 
      height: insets.top > 0 ? insets.top : Platform.OS === 'ios' ? 44 : 24 
    }]}>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={barStyle}
        translucent={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});

export default CustomStatusBar;
