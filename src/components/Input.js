import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.text,
              ...theme.typography.label,
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
            borderColor: error ? theme.colors.error : isFocused ? theme.colors.primary : theme.colors.border,
            backgroundColor: theme.colors.cardBg,
            borderRadius: theme.borderRadius.md,
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
              color: theme.colors.text,
              flex: 1,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textTertiary}
          secureTextEntry={!showPassword && secureTextEntry}
          keyboardType={keyboardType}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconRight}
          >
            <Text style={styles.iconText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
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
    paddingHorizontal: 12,
  },
  input: {
    paddingVertical: 12,
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
