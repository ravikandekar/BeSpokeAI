import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator theme={theme} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
