import React from 'react';
import { View, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomHeader from './CustomHeader';
import GalaxyBackground from './GalaxyBackground';
import darkTheme from '../theme/dark';

const ScreenWrapper = ({
  children,
  title,
  showBackButton = false,
  onBackPress,
  rightComponent,
  theme,
  transparentHeader = false,
  backgroundColor,
  showHeader = true,
}) => {
  const insets = useSafeAreaInsets();
  const isDarkMode = theme.colors.background === darkTheme.colors.background;
  const statusBarBgColor = theme.colors.background;
  const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content';

  return (
    <View style={styles.flex}>
      <RNStatusBar
        backgroundColor={statusBarBgColor}
        barStyle={statusBarStyle}
        translucent={Platform.OS === 'android' ? false : true}
      />
      {Platform.OS === 'ios' && (
        <View style={[styles.statusBarBackground, {
          backgroundColor: statusBarBgColor,
          height: insets.top
        }]} />
      )}
      <GalaxyBackground theme={theme}>
        <View style={[
          styles.container,
          {
            backgroundColor: 'transparent',
            paddingTop: 0
          }
        ]}>
          {showHeader && (
            <CustomHeader
              title={title}
              showBackButton={showBackButton}
              onBackPress={onBackPress}
              rightComponent={rightComponent}
              backgroundColor={transparentHeader ? 'transparent' : theme.colors.surface}
              textColor={theme.colors.text}
              transparent={transparentHeader}
            />
          )}
          <View style={[
            styles.content,
            {
              paddingBottom: insets.bottom,
            }
          ]}>
            {children}
          </View>
        </View>
      </GalaxyBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  statusBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default ScreenWrapper;
