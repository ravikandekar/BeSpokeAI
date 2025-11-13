import React from 'react';
import { StatusBar as RNStatusBar, StyleSheet, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CustomStatusBar = ({ 
  backgroundColor = '#0f172a', 
  barStyle = 'light-content',
  hidden = false 
}) => {
  const insets = useSafeAreaInsets();

  if (hidden) {
    return <RNStatusBar hidden={hidden} />;
  }

  // For Android, we need to set backgroundColor directly
  // For iOS, we use a View with the background color
  if (Platform.OS === 'android') {
    return (
      <>
        <RNStatusBar
          backgroundColor={backgroundColor}
          barStyle={barStyle}
          translucent={false}
        />
      </>
    );
  }

  // For iOS, we need a View to match the background color
  return (
    <View style={[styles.statusBarContainer, { 
      backgroundColor, 
      height: insets.top > 0 ? insets.top : 44 
    }]}>
      <RNStatusBar
        barStyle={barStyle}
        translucent={false}
        backgroundColor={backgroundColor}
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
