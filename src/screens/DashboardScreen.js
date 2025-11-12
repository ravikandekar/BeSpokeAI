import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GalaxyBackground from '../components/GalaxyBackground';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import { useAppStore } from '../store/useAppStore';

const StatCard = ({ theme, icon, label, value }) => (
  <View
    style={[
      styles.statCard,
      {
        backgroundColor: theme.colors.cardBg,
        borderColor: theme.colors.cardBorder,
      },
    ]}
  >
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={[styles.statValue, { color: theme.colors.primary }]}>{value}</Text>
    <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{label}</Text>
  </View>
);

const DashboardScreen = ({ theme }) => {
  const insets = useSafeAreaInsets();
  const user = useAppStore((state) => state.user);

  const stats = [
    { icon: '📞', label: 'Total Calls', value: '145' },
    { icon: '👥', label: 'Contacts', value: '32' },
    { icon: '✓', label: 'Completed', value: '128' },
    { icon: '⏳', label: 'Pending', value: '17' },
  ];

  const actions = [
    { icon: '📞', label: 'Make Call', color: 'primary' },
    { icon: '➕', label: 'Add Contact', color: 'secondary' },
    { icon: '📊', label: 'Reports', color: 'primary' },
    { icon: '⚙️', label: 'Settings', color: 'secondary' },
  ];

  return (
    <ScreenWrapper 
      theme={theme}
      title={`Welcome, ${user?.name || 'User'}`}
      transparentHeader={true}
    >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Header */}
          <View style={styles.welcomeSection}>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Here's your overview
            </Text>
          </View>

        <View style={[styles.content, { paddingBottom: insets.bottom }]}>
          {/* Stats Grid */}
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
                ...theme.typography.h3,
                marginTop: 24,
                marginHorizontal: 16,
              },
            ]}
          >
            Statistics
          </Text>

          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard key={index} theme={theme} {...stat} />
            ))}
          </View>

          {/* Quick Actions */}
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
                ...theme.typography.h3,
                marginTop: 24,
                marginHorizontal: 16,
              },
            ]}
          >
            Quick Actions
          </Text>

          <View style={styles.actionsGrid}>
            {actions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: theme.colors.cardBg,
                    borderColor: theme.colors.cardBorder,
                  },
                ]}
              >
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={[styles.actionLabel, { color: theme.colors.text }]}>
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Info Card */}
          <View
            style={[
              styles.infoCard,
              {
                backgroundColor: theme.colors.surface,
                borderLeftColor: theme.colors.primary,
              },
            ]}
          >
            <Text style={[styles.infoIcon]}>💡</Text>
            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: theme.colors.text }]}>
                Tip of the Day
              </Text>
              <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
                You can swipe left on any call to see more options
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  statCard: {
    width: '48%',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  actionButton: {
    width: '48%',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
  },
});

export default DashboardScreen;
