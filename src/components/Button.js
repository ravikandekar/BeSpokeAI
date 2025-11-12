import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';

const Button = ({
  theme,
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return theme.colors.disabled;
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'outline':
        return 'transparent';
      case 'ghost':
        return 'rgba(99, 102, 241, 0.1)';
      default:
        return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.textSecondary;
    switch (variant) {
      case 'outline':
      case 'ghost':
        return theme.colors.primary;
      default:
        return '#ffffff';
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'outline':
        return theme.colors.primary;
      case 'ghost':
        return 'transparent';
      default:
        return 'transparent';
    }
  };

  const getPaddingVertical = () => {
    switch (size) {
      case 'sm':
        return 10;
      case 'lg':
        return 18;
      default:
        return 14;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return 14;
      case 'lg':
        return 18;
      default:
        return 16;
    }
  };

  const getBorderWidth = () => {
    return variant === 'outline' ? 1 : 0;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderWidth: getBorderWidth(),
          borderColor: getBorderColor(),
          paddingVertical: getPaddingVertical(),
          paddingHorizontal: size === 'sm' ? 16 : size === 'lg' ? 32 : 24,
        },
        fullWidth && styles.fullWidth,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <View style={styles.buttonContent}>
          {icon && <Text style={[styles.icon, { color: getTextColor() }]}>{icon}</Text>}
          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
                fontSize: getFontSize(),
                marginLeft: icon ? 8 : 0,
              },
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  fullWidth: {
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  icon: {
    fontSize: 16,
  },
});

export default Button;
