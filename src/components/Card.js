import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ 
  children, 
  theme, 
  style, 
  title, 
  subtitle, 
  onPress,
  elevation = 2,
  padding = 16 
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;
  const cardProps = onPress ? { activeOpacity: 0.7, onPress } : {};

  return (
    <CardComponent
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.cardBg,
          borderColor: theme.colors.cardBorder,
          shadowOpacity: elevation * 0.05,
          elevation: elevation * 2,
          padding,
        },
        style
      ]}
      {...cardProps}
    >
      {title && (
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {title}
        </Text>
      )}
      {subtitle && (
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          {subtitle}
        </Text>
      )}
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
    lineHeight: 20,
  },
});

export default Card;
