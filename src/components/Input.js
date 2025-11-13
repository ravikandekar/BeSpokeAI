import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Input = ({
  theme,
  label,
  value,
  onChangeText,
  placeholder,
  error,
  required,
  secureTextEntry = false,
  keyboardType = 'default',
  icon,
  onIconPress,
  editable = true,
  loginStyle = false,
  showPasswordToggle = false,
  onTogglePassword,
  showPassword: externalShowPassword,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalShowPassword, setInternalShowPassword] = useState(!secureTextEntry);

  // Use external showPassword if provided, otherwise use internal state
  const showPassword = externalShowPassword !== undefined ? externalShowPassword : internalShowPassword;

  const handleTogglePassword = () => {
    if (onTogglePassword) {
      onTogglePassword();
    } else {
      setInternalShowPassword(!internalShowPassword);
    }
  };

  const getBackgroundColor = () => {
    if (loginStyle) {
      return '#ffffff';
    }
    return theme.colors.cardBg;
  };

  const getTextColor = () => {
    if (loginStyle) {
      return '#000000';
    }
    return theme.colors.text;
  };

  const getPlaceholderColor = () => {
    if (loginStyle) {
      return '#9ca3af';
    }
    return theme.colors.textTertiary;
  };

  const getBorderColor = () => {
    if (loginStyle) {
      return error ? theme.colors.error : isFocused ? theme.colors.primary : '#e5e7eb';
    }
    return error ? theme.colors.error : isFocused ? theme.colors.primary : theme.colors.border;
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: loginStyle ? theme.colors.text : theme.colors.text,
              ...theme.typography.label,
              marginBottom: 8,
            },
          ]}
        >
          {label}
          {required && <Text style={{ color: theme.colors.error }}> *</Text>}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
            borderRadius: theme.borderRadius.md,
            borderWidth: loginStyle ? 1 : 1,
          },
        ]}
      >
        {icon && (
          <TouchableOpacity onPress={onIconPress} style={styles.iconLeft}>
            <Text style={styles.iconText}>{icon}</Text>
          </TouchableOpacity>
        )}

        <TextInput
          style={[
            styles.input,
            {
              color: getTextColor(),
              flex: 1,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={getPlaceholderColor()}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {(secureTextEntry || showPasswordToggle) && (
          <TouchableOpacity
            onPress={handleTogglePassword}
            style={styles.iconRight}
            activeOpacity={0.7}
          >
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color={loginStyle ? '#6b7280' : theme.colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text
          style={[
            styles.error,
            {
              color: theme.colors.error,
              ...theme.typography.bodySmall,
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 16,
    minHeight: 48,
  },
  input: {
    paddingVertical: 14,
    fontSize: 16,
  },
  iconLeft: {
    paddingRight: 8,
  },
  iconRight: {
    paddingLeft: 8,
  },
  iconText: {
    fontSize: 18,
  },
  error: {
    marginTop: 6,
  },
});

export default Input;
