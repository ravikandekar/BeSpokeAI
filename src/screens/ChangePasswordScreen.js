import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

const PasswordRequirement = ({ theme, met, text }) => (
  <View style={styles.requirementItem}>
    <Text
      style={[
        styles.requirementIcon,
        {
          color: met ? theme.colors.success : theme.colors.error,
        },
      ]}
    >
      {met ? '✓' : '✗'}
    </Text>
    <Text
      style={[
        styles.requirementText,
        {
          color: met ? theme.colors.success : theme.colors.textSecondary,
        },
      ]}
    >
      {text}
    </Text>
  </View>
);

const ChangePasswordScreen = ({ theme }) => {
  const insets = useSafeAreaInsets();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    };
  };

  const requirements = validatePassword(newPassword);
  const isPasswordValid =
    requirements.length &&
    requirements.uppercase &&
    requirements.lowercase &&
    requirements.number;

  const handleChangePassword = async () => {
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!isPasswordValid) {
      newErrors.newPassword = 'Password does not meet requirements';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoading(false);
      Alert.alert('Success', 'Password changed successfully', [
        {
          text: 'OK',
          onPress: () => {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
          },
        },
      ]);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to change password');
    }
  };

  return (
    <ScreenWrapper theme={theme} title="Change Password" transparentHeader={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Header theme={theme} title="Change Password" subtitle="Update your security" />

            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={[styles.icon, { fontSize: 56 }]}>🔐</Text>
                <Text
                  style={[
                    styles.title,
                    {
                      color: theme.colors.text,
                      ...theme.typography.h2,
                      marginTop: 16,
                    },
                  ]}
                >
                  Password Security
                </Text>
              </View>

              <View style={styles.form}>
                <Input
                  theme={theme}
                  label="Current Password"
                  value={currentPassword}
                  onChangeText={(text) => {
                    setCurrentPassword(text);
                    setErrors({ ...errors, currentPassword: '' });
                  }}
                  placeholder="Enter current password"
                  error={errors.currentPassword}
                  required
                  secureTextEntry
                  icon="🔒"
                />

                <Input
                  theme={theme}
                  label="New Password"
                  value={newPassword}
                  onChangeText={(text) => {
                    setNewPassword(text);
                    setErrors({ ...errors, newPassword: '' });
                  }}
                  placeholder="Enter new password"
                  error={errors.newPassword}
                  required
                  secureTextEntry
                  icon="🔑"
                />

                <Input
                  theme={theme}
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setErrors({ ...errors, confirmPassword: '' });
                  }}
                  placeholder="Confirm new password"
                  error={errors.confirmPassword}
                  required
                  secureTextEntry
                  icon="✓"
                />

                {/* Password Requirements */}
                <View
                  style={[
                    styles.requirementsBox,
                    {
                      backgroundColor: theme.colors.cardBg,
                      borderColor: theme.colors.cardBorder,
                    },
                  ]}
                >
                  <Text style={[styles.requirementsTitle, { color: theme.colors.text }]}>
                    Password Requirements:
                  </Text>
                  <PasswordRequirement
                    theme={theme}
                    met={requirements.length}
                    text="At least 8 characters"
                  />
                  <PasswordRequirement
                    theme={theme}
                    met={requirements.uppercase}
                    text="One uppercase letter"
                  />
                  <PasswordRequirement
                    theme={theme}
                    met={requirements.lowercase}
                    text="One lowercase letter"
                  />
                  <PasswordRequirement
                    theme={theme}
                    met={requirements.number}
                    text="One number"
                  />
                </View>

                <Button
                  theme={theme}
                  title={loading ? 'Updating...' : 'Update Password'}
                  onPress={handleChangePassword}
                  fullWidth
                  loading={loading}
                  disabled={loading || !isPasswordValid}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  icon: {
    fontSize: 56,
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  requirementsBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementIcon: {
    fontSize: 16,
    marginRight: 8,
    fontWeight: 'bold',
  },
  requirementText: {
    fontSize: 13,
  },
});

export default ChangePasswordScreen;
