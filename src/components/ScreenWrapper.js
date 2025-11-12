import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomHeader from './CustomHeader';
import GalaxyBackground from './GalaxyBackground';

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

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default ScreenWrapper;
