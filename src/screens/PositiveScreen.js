import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';

const ResultCard = ({ theme, result }) => (
  <TouchableOpacity
    style={[
      styles.resultCard,
      {
        backgroundColor: theme.colors.cardBg,
        borderColor: theme.colors.success,
        borderLeftWidth: 4,
      },
    ]}
  >
    <View style={styles.resultHeader}>
      <Text style={styles.resultIcon}>{result.icon}</Text>
      <View style={styles.resultInfo}>
        <Text style={[styles.resultType, { color: theme.colors.text }]}>
          {result.type}
        </Text>
        <Text style={[styles.resultDate, { color: theme.colors.textSecondary }]}>
          {result.date}
        </Text>
      </View>
    </View>
    <Text style={[styles.resultDescription, { color: theme.colors.textSecondary }]}>
      {result.description}
    </Text>
    <View style={styles.resultFooter}>
      <View
        style={[
          styles.badge,
          {
            backgroundColor: theme.colors.success,
          },
        ]}
      >
        <Text style={styles.badgeText}>{result.status}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const PositiveScreen = ({ theme }) => {
  const insets = useSafeAreaInsets();

  const results = [
    {
      id: '1',
      icon: '🎉',
      type: 'Goal Achieved',
      description: 'Completed quarterly targets ahead of schedule',
      date: 'Today',
      status: '✓ Success',
    },
    {
      id: '2',
      icon: '📈',
      type: 'Performance Boost',
      description: 'Increased productivity by 25%',
      date: 'Yesterday',
      status: '✓ Completed',
    },
    {
      id: '3',
      icon: '⭐',
      type: 'Recognition',
      description: 'Received excellent feedback from client',
      date: '2 days ago',
      status: '✓ Achieved',
    },
    {
      id: '4',
      icon: '🏆',
      type: 'Award',
      description: 'Won team employee of the month',
      date: '1 week ago',
      status: '✓ Success',
    },
    {
      id: '5',
      icon: '🚀',
      type: 'Project Launch',
      description: 'Successfully launched new feature to production',
      date: '2 weeks ago',
      status: '✓ Live',
    },
  ];

  const stats = [
    { label: 'Total', value: '48', icon: '📊' },
    { label: 'This Month', value: '12', icon: '📅' },
    { label: 'Streak', value: '7 days', icon: '🔥' },
  ];

  return (
    <ScreenWrapper theme={theme} title="Positive Results" transparentHeader={true}>
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        <Header theme={theme} title="Positive Results" subtitle="Successes and achievements" />

        <View style={[styles.content, { paddingBottom: insets.bottom }]}>
          {/* Stats */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View
                key={index}
                style={[
                  styles.statBox,
                  {
                    backgroundColor: theme.colors.surface,
                  },
                ]}
              >
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                  {stat.value}
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Results List */}
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
                ...theme.typography.h3,
              },
            ]}
          >
            Recent Successes
          </Text>

          {results.map((result) => (
            <ResultCard key={result.id} theme={theme} result={result} />
          ))}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  resultCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  resultDate: {
    fontSize: 12,
  },
  resultDescription: {
    fontSize: 13,
    marginBottom: 12,
  },
  resultFooter: {
    alignItems: 'flex-start',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
});

export default PositiveScreen;
