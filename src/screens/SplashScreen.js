import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import GalaxyBackground from '../components/GalaxyBackground';

const SplashScreen = ({ theme }) => {
  const scaleValue = React.useRef(new Animated.Value(0.8)).current;
  const opacityValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleValue, opacityValue]);

  return (
    <GalaxyBackground theme={theme}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              transform: [{ scale: scaleValue }],
              opacity: opacityValue,
            },
          ]}
        >
          <Text style={[styles.logo, { color: theme.colors.starPrimary }]}>✨</Text>
          <Text style={[styles.title, { color: theme.colors.text, ...theme.typography.h1 }]}>
            AI App
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Welcome to Galaxy
          </Text>
        </Animated.View>
      </View>
    </GalaxyBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SplashScreen;
