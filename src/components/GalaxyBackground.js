import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const Star = ({ theme, index, totalStars }) => {
  const opacityValue = React.useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 2000 + index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [index, opacityValue]);

  // Better distribution using golden ratio
  const goldenRatio = 1.618033988749895;
  const randomLeft = ((index * goldenRatio * 100) % 100);
  const randomTop = ((index * goldenRatio * 0.618 * 100) % 100);
  
  // More varied star sizes - much smaller on average
  const sizeCategories = [
    { min: 0.5, max: 1.5, weight: 60 },  // 60% tiny stars
    { min: 1.5, max: 2.5, weight: 30 },  // 30% small stars
    { min: 2.5, max: 4, weight: 10 },     // 10% medium stars
  ];
  
  const categoryIndex = (index % 100) < 60 ? 0 : (index % 100) < 90 ? 1 : 2;
  const category = sizeCategories[categoryIndex];
  const randomSize = category.min + (Math.sin(index * 0.7) * 0.5 + 0.5) * (category.max - category.min);
  
  // Alternate between star colors
  const starColor = index % 3 === 0 ? theme.colors.starPrimary : theme.colors.starSecondary;

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: `${randomLeft}%`,
          top: `${randomTop}%`,
          width: randomSize,
          height: randomSize,
          borderRadius: randomSize / 2,
          backgroundColor: starColor,
          shadowColor: starColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: randomSize,
        },
        { opacity: opacityValue },
      ]}
    />
  );
};

const GalaxyBackground = ({ theme, children }) => {
  const stars = Array.from({ length: 150 }).map((_, i) => i); // Increased from 40 to 150

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Star field with multiple layers */}
      {stars.map((i) => (
        <Star key={i} theme={theme} index={i} totalStars={stars.length} />
      ))}

      {/* Enhanced nebula overlay */}
      <View
        style={[
          styles.nebula,
          {
            backgroundColor: theme.colors.nebula,
            opacity: 0.08,
          },
        ]}
      />
      
      {/* Secondary nebula for depth */}
      <View
        style={[
          styles.nebulaSecondary,
          {
            backgroundColor: theme.colors.primary,
            opacity: 0.05,
          },
        ]}
      />

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  nebula: {
    position: 'absolute',
    width: '150%',
    height: '150%',
    borderRadius: 9999,
    top: '-25%',
    left: '-25%',
  },
  nebulaSecondary: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    borderRadius: 9999,
    top: '-10%',
    right: '-10%',
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
});

export default GalaxyBackground;
