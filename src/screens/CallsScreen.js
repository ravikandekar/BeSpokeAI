import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';

const CallItem = ({ theme, call }) => (
  <TouchableOpacity
    style={[
      styles.callItem,
      {
        backgroundColor: theme.colors.cardBg,
        borderColor: theme.colors.cardBorder,
      },
    ]}
  >
    <View style={styles.callItemContent}>
      <View style={styles.callInfo}>
        <Text style={[styles.callName, { color: theme.colors.text }]}>{call.name}</Text>
        <Text style={[styles.callNumber, { color: theme.colors.textSecondary }]}>
          {call.number}
        </Text>
      </View>
      <View style={styles.callDetails}>
        <Text style={[styles.callDuration, { color: theme.colors.primary }]}>
          {call.duration}
        </Text>
        <Text style={[styles.callTime, { color: theme.colors.textTertiary }]}>
          {call.time}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const CallsScreen = ({ theme }) => {
  const insets = useSafeAreaInsets();

  const calls = [
    { id: '1', name: 'John Doe', number: '+1 234 567 8900', duration: '5m 30s', time: 'Today' },
    { id: '2', name: 'Jane Smith', number: '+1 234 567 8901', duration: '2m 15s', time: 'Today' },
    { id: '3', name: 'Bob Johnson', number: '+1 234 567 8902', duration: '10m 45s', time: 'Yesterday' },
    { id: '4', name: 'Alice Brown', number: '+1 234 567 8903', duration: '3m 20s', time: 'Yesterday' },
    { id: '5', name: 'Charlie Wilson', number: '+1 234 567 8904', duration: '7m 10s', time: '2 days ago' },
  ];

  const stats = [
    { label: 'Total Calls', value: '145', icon: '📞' },
    { label: 'Duration', value: '2,450 min', icon: '⏱️' },
    { label: 'Avg Duration', value: '16m 50s', icon: '📊' },
  ];

  return (
    <ScreenWrapper theme={theme} title="Calls" transparentHeader={true}>
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        <Header theme={theme} title="Calls" subtitle="Call history and statistics" />

        <View style={[styles.content, { paddingBottom: insets.bottom }]}>
          {/* Stats Bar */}
          <View style={styles.statsBar}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <View>
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                    {stat.label}
                  </Text>
                  <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                    {stat.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Call List */}
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
                ...theme.typography.h3,
              },
            ]}
          >
            Recent Calls
          </Text>

          <View>
            {calls.map((call) => (
              <CallItem key={call.id} theme={theme} call={call} />
            ))}
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
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  statsBar: {
    marginBottom: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginBottom: 16,
  },
  callItem: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  callItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callInfo: {
    flex: 1,
  },
  callName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  callNumber: {
    fontSize: 12,
  },
  callDetails: {
    alignItems: 'flex-end',
  },
  callDuration: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  callTime: {
    fontSize: 12,
  },
});

export default CallsScreen;
