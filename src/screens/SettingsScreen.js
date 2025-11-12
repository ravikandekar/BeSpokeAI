import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import { useAppStore } from '../store/useAppStore';
import { storage } from '../utils/storage';

const SettingItem = ({ theme, icon, label, value, onPress, isSwitch, onValueChange }) => (
  <TouchableOpacity
    style={[
      styles.settingItem,
      {
        backgroundColor: theme.colors.cardBg,
        borderColor: theme.colors.cardBorder,
      },
    ]}
    onPress={onPress}
    disabled={isSwitch}
  >
    <View style={styles.settingLeft}>
      <Text style={styles.settingIcon}>{icon}</Text>
      <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
        {label}
      </Text>
    </View>
    <View style={styles.settingRight}>
      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: theme.colors.inactive,
            true: theme.colors.primary,
          }}
          thumbColor={theme.colors.primary}
        />
      ) : (
        <>
          <Text style={[styles.settingValue, { color: theme.colors.textSecondary }]}>
            {value}
          </Text>
          <Text style={styles.arrow}>›</Text>
        </>
      )}
    </View>
  </TouchableOpacity>
);

const SettingsScreen = ({ theme, navigation }) => {
  const insets = useSafeAreaInsets();
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const setIsDarkMode = useAppStore((state) => state.setIsDarkMode);
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const setIsLoggedIn = useAppStore((state) => state.setIsLoggedIn);

  const handleThemeToggle = async (value) => {
    setIsDarkMode(value);
    await storage.saveThemeMode(value);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await storage.clearUserData();
              logout();
              setIsLoggedIn(false);
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          },
        },
      ]
    );
  };

  return (
    <ScreenWrapper theme={theme} title="Settings" transparentHeader={true}>
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        <Header theme={theme} title="Settings" subtitle="Manage your preferences" />

        <View style={[styles.content, { paddingBottom: insets.bottom }]}>
          {/* Profile Card */}
          <View
            style={[
              styles.profileCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.cardBorder,
              },
            ]}
          >
            <View
              style={[
                styles.profileAvatar,
                {
                  backgroundColor: theme.colors.primary,
                },
              ]}
            >
              <Text style={styles.profileAvatarText}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: theme.colors.text }]}>
                {user?.name || 'User'}
              </Text>
              <Text style={[styles.profileEmail, { color: theme.colors.textSecondary }]}>
                {user?.email || 'email@example.com'}
              </Text>
            </View>
          </View>

          {/* Display Settings */}
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            Display
          </Text>

          <SettingItem
            theme={theme}
            icon="🌙"
            label="Dark Mode"
            value={isDarkMode}
            isSwitch
            onValueChange={handleThemeToggle}
          />

          <SettingItem
            theme={theme}
            icon="🔤"
            label="Text Size"
            value="Medium"
            onPress={() => {}}
          />

          {/* App Settings */}
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            App
          </Text>

          <SettingItem
            theme={theme}
            icon="🔔"
            label="Notifications"
            value="Enabled"
            onPress={() => {}}
          />

          <SettingItem
            theme={theme}
            icon="🔐"
            label="Privacy"
            value="Standard"
            onPress={() => {}}
          />

          {/* Account Settings */}
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            Account
          </Text>

          <SettingItem
            theme={theme}
            icon="🔑"
            label="Change Password"
            value="Update Password"
            onPress={() => navigation.navigate('ChangePassword')}
          />

          <SettingItem
            theme={theme}
            icon="ℹ️"
            label="About App"
            value="v1.0.0"
            onPress={() => {}}
          />

          {/* Logout */}
          <TouchableOpacity
            style={[
              styles.logoutButton,
              {
                backgroundColor: theme.colors.error,
              },
            ]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileCard: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  settingValue: {
    fontSize: 12,
    marginRight: 8,
  },
  arrow: {
    fontSize: 16,
    color: '#999',
  },
  logoutButton: {
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 24,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;
