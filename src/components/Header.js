import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({ theme, title, subtitle, rightComponent }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: 'transparent',
          paddingTop: insets.top,
          borderBottomColor: 'rgba(71, 85, 105, 0.3)',
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text,
                ...theme.typography.h2,
              },
            ]}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.colors.textSecondary,
                  ...theme.typography.bodySmall,
                },
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
        {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    marginTop: 2,
  },
  rightComponent: {
    marginLeft: 16,
  },
});

export default Header;
