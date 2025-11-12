import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenWrapper from '../components/ScreenWrapper';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAppStore } from '../store/useAppStore';
import { storage } from '../utils/storage';

const DomainModal = ({ theme, navigation }) => {
  const insets = useSafeAreaInsets();
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const setDomainStore = useAppStore((state) => state.setDomain);

  const validateDomain = (text) => {
    const domainRegex = /^[a-zA-Z0-9-]+$/;
    return domainRegex.test(text);
  };

  const handleContinue = async () => {
    if (!domain.trim()) {
      setError('Domain is required');
      return;
    }

    if (!validateDomain(domain)) {
      setError('Domain can only contain letters, numbers, and hyphens');
      return;
    }

    try {
      setLoading(true);
      const fullDomain = `${domain}.bespokeai.com`;
      
      await storage.saveDomain(fullDomain);
      setDomainStore(fullDomain);
      
      setLoading(false);
      navigation.replace('Login');
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', 'Failed to save domain. Please try again.');
    }
  };

  const getDomainPreview = () => {
    if (!domain) return 'your-domain.bespokeai.com';
    return `${domain}.bespokeai.com`;
  };

  return (
    <ScreenWrapper theme={theme} showHeader={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View
          style={[
            styles.container,
            {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={[styles.logo, { color: theme.colors.starPrimary }]}>🌐</Text>
              <Text style={[styles.title, { color: theme.colors.text, ...theme.typography.h2 }]}>
                Setup Your Domain
              </Text>
              <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
                Enter your organization domain to get started
              </Text>
            </View>

            <View style={styles.form}>
              <Input
                theme={theme}
                label="Domain Name"
                value={domain}
                onChangeText={(text) => {
                  setDomain(text);
                  setError('');
                }}
                placeholder="e.g., ravi"
                error={error}
                required
                keyboardType="default"
              />

              <View
                style={[
                  styles.previewBox,
                  {
                    backgroundColor: theme.colors.cardBg,
                    borderColor: theme.colors.cardBorder,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.previewLabel,
                    {
                      color: theme.colors.textSecondary,
                      ...theme.typography.bodySmall,
                    },
                  ]}
                >
                  Full Domain:
                </Text>
                <Text
                  style={[
                    styles.previewValue,
                    {
                      color: theme.colors.primary,
                      ...theme.typography.body,
                    },
                  ]}
                >
                  {getDomainPreview()}
                </Text>
              </View>
            </View>

            <Button
              theme={theme}
              title={loading ? 'Loading...' : 'Continue'}
              onPress={handleContinue}
              fullWidth
              loading={loading}
              disabled={loading || !domain.trim()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  content: {
    marginBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  previewBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  previewLabel: {
    marginBottom: 6,
  },
  previewValue: {
    fontWeight: '600',
  },
});

export default DomainModal;
