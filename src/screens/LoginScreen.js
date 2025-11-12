import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAppStore } from '../store/useAppStore';
import { storage } from '../utils/storage';

const LoginScreen = ({ theme, navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const setIsLoggedIn = useAppStore((state) => state.setIsLoggedIn);
  const setUser = useAppStore((state) => state.setUser);
  const domain = useAppStore((state) => state.domain);

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleLogin = async () => {
    let hasError = false;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    if (hasError) return;

    try {
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const userData = {
        email,
        name: email.split('@')[0],
        domain,
      };

      await storage.saveUser(userData);
      await storage.setLoginStatus(true);

      setUser(userData);
      setIsLoggedIn(true);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <ScreenWrapper theme={theme} showHeader={false}>
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
            <Header
              theme={theme}
              title="Welcome Back"
              subtitle={`Logging in to ${domain}`}
            />

            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={[styles.icon, { fontSize: 64 }]}>🔑</Text>
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
                  Sign In
                </Text>
              </View>

              <View style={styles.form}>
                <Input
                  theme={theme}
                  label="Email Address"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setEmailError('');
                  }}
                  placeholder="name@example.com"
                  error={emailError}
                  required
                  keyboardType="email-address"
                  icon="✉️"
                />

                <Input
                  theme={theme}
                  label="Password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError('');
                  }}
                  placeholder="••••••••"
                  error={passwordError}
                  required
                  secureTextEntry
                  icon="🔒"
                />

                <Button
                  theme={theme}
                  title={loading ? 'Signing In...' : 'Sign In'}
                  onPress={handleLogin}
                  fullWidth
                  loading={loading}
                  disabled={loading}
                />
              </View>

              <View style={styles.footer}>
                <Text style={[{ color: theme.colors.textSecondary }]}>
                  Don't have an account?
                </Text>
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
    justifyContent: 'center',
    paddingVertical: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
});

export default LoginScreen;
