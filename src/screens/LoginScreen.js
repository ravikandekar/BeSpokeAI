import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Alert,
  Dimensions,
  TouchableOpacity,
  StatusBar as RNStatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GalaxyBackground from '../components/GalaxyBackground';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAppStore } from '../store/useAppStore';
import { storage } from '../utils/storage';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const LoginScreen = ({ theme, navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('testuser2025@webespokeai.com');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);

  const setIsLoggedIn = useAppStore((state) => state.setIsLoggedIn);
  const setUser = useAppStore((state) => state.setUser);
  const domain = useAppStore((state) => state.domain);
  const isDarkMode = useAppStore((state) => state.isDarkMode);

  // Status bar background color - matching the galaxy background
  const statusBarBgColor = theme.colors.background;
  const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content';

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

    if (!recaptchaChecked) {
      Alert.alert('Verification Required', 'Please complete the reCAPTCHA verification');
      return;
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}
        >
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={[
              styles.container,
              { paddingTop: insets.top, paddingBottom: insets.bottom }
            ]}>
              {/* Custom Header - not using navigation stack */}
              <View style={styles.customHeader}>
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
                  Welcome Back
                </Text>
                <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
                  Enter your credentials to continue
                </Text>
              </View>

              {/* Main Content - Split Layout */}
              <View style={styles.mainContent}>
                {/* Left Section - Promotional */}
                <View style={styles.leftSection}>
                  <Text style={[styles.promoTitle, { color: theme.colors.text }]}>
                    Unlock the Future{'\n'}
                    <Text style={[styles.promoTitleHighlight, { color: theme.colors.primary }]}>
                      of AI
                    </Text>
                  </Text>
                  <Text style={[styles.promoSubtitle, { color: theme.colors.textSecondary }]}>
                    Experience the next generation of intelligence with secure and seamless access.
                  </Text>
                </View>

                {/* Right Section - Login Form */}
                <View style={[
                  styles.rightSection,
                  { 
                    backgroundColor: isDarkMode 
                      ? 'rgba(30, 41, 59, 0.85)' 
                      : 'rgba(255, 255, 255, 0.95)',
                  }
                ]}>
                  <View style={styles.formContainer}>
                    <Input
                      theme={theme}
                      label="Email ID"
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        setEmailError('');
                      }}
                      placeholder="name@example.com"
                      error={emailError}
                      required
                      keyboardType="email-address"
                      loginStyle={true}
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
                      secureTextEntry={true}
                      showPasswordToggle={true}
                      showPassword={showPassword}
                      onTogglePassword={() => setShowPassword(!showPassword)}
                      loginStyle={true}
                    />

                    {/* reCAPTCHA */}
                    <View style={[
                      styles.recaptchaContainer,
                      {
                        backgroundColor: isDarkMode 
                          ? 'rgba(255, 255, 255, 0.1)' 
                          : 'rgba(0, 0, 0, 0.05)',
                        borderColor: isDarkMode 
                          ? 'rgba(255, 255, 255, 0.2)' 
                          : 'rgba(0, 0, 0, 0.1)',
                      }
                    ]}>
                      <TouchableOpacity
                        style={[
                          styles.recaptchaCheckbox,
                          {
                            backgroundColor: recaptchaChecked 
                              ? theme.colors.primary 
                              : 'transparent',
                            borderColor: isDarkMode 
                              ? 'rgba(255, 255, 255, 0.3)' 
                              : 'rgba(0, 0, 0, 0.2)',
                          }
                        ]}
                        onPress={() => setRecaptchaChecked(!recaptchaChecked)}
                        activeOpacity={0.7}
                      >
                        {recaptchaChecked && (
                          <Text style={styles.checkmark}>✓</Text>
                        )}
                      </TouchableOpacity>
                      <View style={styles.recaptchaTextContainer}>
                        <Text style={[styles.recaptchaText, { color: theme.colors.text }]}>
                          I'm not a robot
                        </Text>
                        <View style={styles.recaptchaLogo}>
                          <Text style={[styles.recaptchaLogoText, { color: theme.colors.textSecondary }]}>
                            reCAPTCHA
                          </Text>
                          <Text style={[styles.recaptchaPrivacyText, { color: theme.colors.textTertiary }]}>
                            Privacy - Terms
                          </Text>
                        </View>
                      </View>
                    </View>

                    <Button
                      theme={theme}
                      title={loading ? 'Signing In...' : 'LOGIN'}
                      onPress={handleLogin}
                      fullWidth
                      loading={loading}
                      disabled={loading}
                      gradient={true}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: isTablet ? 48 : 24,
  },
  customHeader: {
    paddingVertical: 24,
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  mainContent: {
    flex: 1,
    flexDirection: isTablet ? 'row' : 'column',
    gap: isTablet ? 48 : 32,
    marginTop: 16,
  },
  leftSection: {
    flex: isTablet ? 1 : 0,
    justifyContent: 'center',
    paddingVertical: isTablet ? 0 : 24,
    paddingHorizontal: isTablet ? 0 : 8,
  },
  promoTitle: {
    fontSize: isTablet ? 48 : 36,
    fontWeight: '700',
    lineHeight: isTablet ? 56 : 44,
    marginBottom: 16,
  },
  promoTitleHighlight: {
    fontWeight: '700',
  },
  promoSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  rightSection: {
    flex: isTablet ? 1 : 0,
    borderRadius: 20,
    padding: 32,
    minHeight: isTablet ? 0 : 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  formContainer: {
    gap: 20,
  },
  recaptchaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  recaptchaCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recaptchaTextContainer: {
    flex: 1,
  },
  recaptchaText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  recaptchaLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recaptchaLogoText: {
    fontSize: 10,
    fontWeight: '400',
  },
  recaptchaPrivacyText: {
    fontSize: 10,
    fontWeight: '400',
  },
});

export default LoginScreen;
