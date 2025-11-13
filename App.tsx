import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, Platform } from 'react-native';

// Store & Theme
import { useAppStore } from './src/store/useAppStore';
import darkTheme from './src/theme/dark';
import lightTheme from './src/theme/light';

// Navigation
import { RootNavigator } from './src/navigation';


const App = () => {
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    setTheme(isDarkMode ? darkTheme : lightTheme);
  }, [isDarkMode]);

  const statusBarBgColor = theme.colors.background;
  const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content';

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={statusBarBgColor}
        barStyle={statusBarStyle}
        translucent={Platform.OS === 'android' ? false : true}
      />
      <NavigationContainer>
        <RootNavigator theme={theme} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
