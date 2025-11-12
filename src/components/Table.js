import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

const Table = ({ theme, data, columns, title }) => {
  if (!data || data.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.colors.cardBg }]}>
        <Text
          style={[
            styles.emptyText,
            {
              color: theme.colors.textSecondary,
              ...theme.typography.body,
            },
          ]}
        >
          No data available
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {title && (
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text,
              ...theme.typography.h3,
              marginBottom: 12,
            },
          ]}
        >
          {title}
        </Text>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View>
          {/* Header Row */}
          <View
            style={[
              styles.row,
              {
                backgroundColor: theme.colors.surface,
                borderBottomColor: theme.colors.divider,
                borderBottomWidth: 2,
              },
            ]}
          >
            {columns.map((column) => (
              <View key={column.key} style={[styles.cell, { width: column.width || 100 }]}>
                <Text
                  style={[
                    styles.headerText,
                    {
                      color: theme.colors.text,
                      fontWeight: 'bold',
                    },
                  ]}
                >
                  {column.label}
                </Text>
              </View>
            ))}
          </View>

          {/* Data Rows */}
          {data.map((item, rowIndex) => (
            <View
              key={rowIndex}
              style={[
                styles.row,
                {
                  backgroundColor:
                    rowIndex % 2 === 0 ? theme.colors.cardBg : theme.colors.surface,
                  borderBottomColor: theme.colors.divider,
                  borderBottomWidth: 1,
                },
              ]}
            >
              {columns.map((column) => (
                <View key={column.key} style={[styles.cell, { width: column.width || 100 }]}>
                  <Text
                    style={[
                      styles.cellText,
                      {
                        color: theme.colors.text,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {item[column.key]}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
  },
  title: {
    marginBottom: 12,
  },
  scrollView: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  cell: {
    padding: 12,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cellText: {
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    borderRadius: 8,
  },
  emptyText: {
    textAlign: 'center',
  },
});

export default Table;
