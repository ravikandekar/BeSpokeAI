import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';

const PersonCard = ({ theme, person }) => (
  <TouchableOpacity
    style={[
      styles.personCard,
      {
        backgroundColor: theme.colors.cardBg,
        borderColor: theme.colors.cardBorder,
      },
    ]}
  >
    <View style={styles.personHeader}>
      <View
        style={[
          styles.avatar,
          {
            backgroundColor: theme.colors.primary,
          },
        ]}
      >
        <Text style={styles.avatarText}>{person.name.charAt(0)}</Text>
      </View>
      <View style={styles.personInfo}>
        <Text style={[styles.personName, { color: theme.colors.text }]}>
          {person.name}
        </Text>
        <Text style={[styles.personTitle, { color: theme.colors.textSecondary }]}>
          {person.title}
        </Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor:
              person.status === 'online' ? theme.colors.success : theme.colors.inactive,
          },
        ]}
      >
        <Text style={styles.statusText}>{person.status === 'online' ? '●' : '○'}</Text>
      </View>
    </View>

    <View style={styles.personStats}>
      <View style={styles.statItem}>
        <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
          Calls
        </Text>
        <Text style={[styles.statValue, { color: theme.colors.primary }]}>
          {person.calls}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.statItem}>
        <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
          Last Call
        </Text>
        <Text style={[styles.statValue, { color: theme.colors.primary }]}>
          {person.lastCall}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const PeopleScreen = ({ theme }) => {
  const insets = useSafeAreaInsets();

  const people = [
    { id: '1', name: 'John Doe', title: 'Team Lead', status: 'online', calls: '24', lastCall: '1h ago' },
    { id: '2', name: 'Jane Smith', title: 'Developer', status: 'online', calls: '18', lastCall: '2h ago' },
    { id: '3', name: 'Bob Johnson', title: 'Manager', status: 'offline', calls: '35', lastCall: 'Yesterday' },
    { id: '4', name: 'Alice Brown', title: 'Designer', status: 'online', calls: '12', lastCall: '30m ago' },
    { id: '5', name: 'Charlie Wilson', title: 'QA Engineer', status: 'offline', calls: '28', lastCall: '2 days ago' },
  ];

  return (
    <ScreenWrapper theme={theme} title="People" transparentHeader={true}>
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        <Header theme={theme} title="People" subtitle="Team members and contacts" />

        <View style={[styles.content, { paddingBottom: insets.bottom }]}>
          <View style={styles.filterBar}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                {
                  backgroundColor: theme.colors.primary,
                },
              ]}
            >
              <Text style={styles.filterText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                {
                  backgroundColor: theme.colors.cardBg,
                  borderColor: theme.colors.cardBorder,
                  borderWidth: 1,
                },
              ]}
            >
              <Text style={[styles.filterText, { color: theme.colors.text }]}>
                Online
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                {
                  backgroundColor: theme.colors.cardBg,
                  borderColor: theme.colors.cardBorder,
                  borderWidth: 1,
                },
              ]}
            >
              <Text style={[styles.filterText, { color: theme.colors.text }]}>
                Teams
              </Text>
            </TouchableOpacity>
          </View>

          {people.map((person) => (
            <PersonCard key={person.id} theme={theme} person={person} />
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
  filterBar: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  filterText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  personCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  personHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  personTitle: {
    fontSize: 12,
  },
  statusBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    color: '#ffffff',
  },
  personStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 30,
  },
});

export default PeopleScreen;
