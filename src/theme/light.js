export default {
  colors: {
    // Primary Colors
    primary: '#4f46e5',
    secondary: '#7c3aed',
    accent: '#db2777',
    
    // Background
    background: '#f8fafc',
    surface: '#f1f5f9',
    surfaceVariant: '#e2e8f0',
    cardBg: '#ffffff',
    
    // Text
    text: '#0f172a',
    textSecondary: '#334155',
    textTertiary: '#64748b',
    
    // Galaxy Stars
    starPrimary: '#f59e0b',
    starSecondary: '#f59e0b',
    starTertiary: '#fbbf24',
    nebula: '#ec4899',
    nebulaSecondary: '#7c3aed',
    
    // UI Elements
    border: '#e2e8f0',
    cardBorder: '#cbd5e1',
    divider: '#f1f5f9',
    inactive: '#cbd5e1',
    inactiveTab: '#cbd5e1',
    
    // Status Colors
    success: '#059669',
    error: '#dc2626',
    warning: '#d97706',
    info: '#0284c7',
    
    // Additional
    overlay: 'rgba(248, 250, 252, 0.8)',
    disabled: '#e2e8f0',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: 'bold',
      lineHeight: 32,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 28,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 24,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 20,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 18,
    },
    label: {
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 14,
    },
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 3,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 8,
    },
  },

  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 999,
  },
};
