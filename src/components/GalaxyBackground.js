import React, { useEffect, useRef, memo } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Platform,
} from 'react-native';

/**
 * Star component - single star
 * - Uses a seeded pseudo-random function for stable placement across the screen.
 * - Size scaled by screen diagonal so stars look proportional on phones/tablets.
 * - Twinkle animation with a per-star offset for variety.
 */
const Star = memo(({ theme, index, layerMultiplier, maxStars }) => {
  const { width, height } = useWindowDimensions();
  const diag = Math.sqrt(width * width + height * height);

  // seeded pseudo-random (stable)
  const seededRandom = (seed) => {
    // `sin`-based pseudo-random; deterministic per seed
    const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };

  // Position as percentages to allow responsive placement on all screen sizes
  const leftPct = seededRandom(index + layerMultiplier * 13) * 100;
  const topPct = seededRandom(index + layerMultiplier * 97 + 42) * 100;

  // Size categories per layer to create depth:
  // layerMultiplier: 0 (far) -> smaller, 1 (mid) -> medium, 2 (near) -> larger
  const baseSizePx = 1 + layerMultiplier * 1.8; // base px
  // scale with diagonal to keep comfortable sizes on tablets/phones
  const size = Math.max(0.8, baseSizePx * (diag / 500)); // clamp min

  // color selection (safe fallback)
  const starColor =
    index % 5 === 0
      ? theme?.colors?.starPrimary ?? '#ffffff'
      : theme?.colors?.starSecondary ?? '#e6eef8';

  // twinkle animation
  const opacityValue = useRef(new Animated.Value(0.5 + seededRandom(index) * 0.5)).current;

  useEffect(() => {
    // Vary durations and delays per star for natural effects
    const toBrightDuration = 1200 + (seededRandom(index + 1) * 2200);
    const toDimDuration = 1000 + (seededRandom(index + 2) * 2000);
    const initialDelay = seededRandom(index + 3) * 1500;

    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: toBrightDuration,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0.3 + layerMultiplier * 0.2, // far layer dims more
          duration: toDimDuration,
          useNativeDriver: true,
        }),
      ])
    );

    const timeout = setTimeout(() => anim.start(), initialDelay);

    return () => {
      clearTimeout(timeout);
      anim.stop();
    };
  }, [index, layerMultiplier, opacityValue]);

  return (
    <Animated.View
      // left/top as percent strings so layout adapts to screen size
      style={[
        styles.star,
        {
          left: `${leftPct}%`,
          top: `${topPct}%`,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: starColor,
          shadowColor: starColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.9,
          shadowRadius: Math.max(1, size * 2),
          elevation: Platform.OS === 'android' ? Math.min(6, Math.round(size)) : 0,
          opacity: opacityValue, // Animated value
          transform: [
            // Slight scale variation so stars are not identical shapes
            {
              scale: 0.85 + seededRandom(index + 7) * 0.35,
            },
          ],
        },
      ]}
    />
  );
});

/**
 * GalaxyBackground - container component
 *
 * Props:
 * - theme: { colors: { background, starPrimary, starSecondary, nebula } }
 * - children: content to render on top of galaxy
 */
const GalaxyBackground = ({ theme = defaultTheme(), children }) => {
  // Configure layers: each layer has a multiplier controlling size/opacity and number of stars
  const layers = [
    { multiplier: 0, count: 120 }, // far (many, small)
    { multiplier: 1, count: 80 },  // mid
    { multiplier: 2, count: 40 },  // near (fewer, larger)
  ];

  // Create arrays for stars per layer
  const starElements = layers.flatMap((layer, li) =>
    Array.from({ length: layer.count }).map((_, i) => {
      const globalIndex = li * 10000 + i; // ensure seed space separation per layer
      return (
        <Star
          key={`star-${li}-${i}`}
          theme={theme}
          index={globalIndex}
          layerMultiplier={layer.multiplier}
          maxStars={layers.reduce((s, l) => s + l.count, 0)}
        />
      );
    })
  );

  return (
    <View style={[styles.container, { backgroundColor: theme?.colors?.background ?? '#000' }]}>
      {/* Nebula / soft glow background — two overlapping blobs for variety */}
      <View
        pointerEvents="none"
        style={[
          styles.nebula,
          {
            backgroundColor: theme?.colors?.background ?? '#2b2f6b',
            opacity: 0.1,
            transform: [{ scale: 1.3 }, { rotate: '25deg' }],
            left: '-20%',
            top: '-18%',
          },
        ]}
      />


      {/* Stars */}
      {starElements}

      {/* Foreground content (zIndex higher) */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default GalaxyBackground;

/* ---------- Styles & defaults ---------- */

function defaultTheme() {
  return {
    colors: {
      background: '#040614',
      starPrimary: '#ffffff',
      starSecondary: '#dfe9ff',
      nebula: '#4b2b8d',
      nebulaSecondary: '#1f75ff',
    },
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  star: {
    position: 'absolute',
  },
  nebula: {
    position: 'absolute',
    width: '150%',
    height: '150%',
    borderRadius: 9999,
    zIndex: 1,
  },
  nebulaSecondary: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    borderRadius: 9999,
    zIndex: 1,
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
});
