import React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import SplashScreen from '../screens/SplashScreen';
import DomainModal from '../screens/DomainModal';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import CallsScreen from '../screens/CallsScreen';
import PeopleScreen from '../screens/PeopleScreen';
import PositiveScreen from '../screens/PositiveScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

// Components
import CustomHeader from '../components/CustomHeader';
import TabIcon from '../components/TabIcon';

// Utils
import { storage } from '../utils/storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Splash Stack
export const SplashStackNavigator = ({ theme }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Splash" options={{ headerShown: false }}>
      {(props) => <SplashScreen {...props} theme={theme} />}
    </Stack.Screen>
  </Stack.Navigator>
);

// Auth Stack
export const AuthStackNavigator = ({ theme }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="DomainModal">
      {(props) => <DomainModal {...props} theme={theme} />}
    </Stack.Screen>
    <Stack.Screen name="Login">
      {(props) => <LoginScreen {...props} theme={theme} />}
    </Stack.Screen>
  </Stack.Navigator>
);

// Settings Stack
export const SettingsStackNavigator = ({ theme }) => (
  <Stack.Navigator
    screenOptions={{
      header: ({ navigation, route }) => (
        <CustomHeader
          title={route.name === 'ChangePassword' ? 'Change Password' : 'Settings'}
          backgroundColor={theme.colors.surface}
          textColor={theme.colors.text}
          showBackButton={route.name === 'ChangePassword'}
        />
      ),
    }}
  >
    <Stack.Screen name="SettingsMain">
      {(props) => <SettingsScreen {...props} theme={theme} />}
    </Stack.Screen>
    <Stack.Screen name="ChangePassword">
      {(props) => <ChangePasswordScreen {...props} theme={theme} />}
    </Stack.Screen>
  </Stack.Navigator>
);

// App Stack (Tab Navigation)
export const AppStackNavigator = ({ theme }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.inactiveTab,
      tabBarStyle: {
        backgroundColor: theme.colors.surface,
        borderTopColor: theme.colors.cardBorder,
        borderTopWidth: 0.5,
        paddingBottom: 8,
        paddingTop: 12,
        height: 75,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        borderTopWidth: 0,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderLeftColor: theme.colors.cardBorder,
        borderRightColor: theme.colors.cardBorder,
      },
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '700',
        marginTop: 6,
        marginBottom: 2,
        letterSpacing: 0.3,
      },
      tabBarItemStyle: {
        paddingVertical: 6,
        paddingHorizontal: 4,
      },
      tabBarIndicatorStyle: {
        backgroundColor: theme.colors.primary,
        height: 3,
      },
    })}
  >
    <Tab.Screen
      name="DashboardTab"
      options={{
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon icon="dashboard" color={color} size={size} focused={focused} />
        ),
      }}
    >
      {(props) => <DashboardScreen {...props} theme={theme} />}
    </Tab.Screen>

    <Tab.Screen
      name="CallsTab"
      options={{
        tabBarLabel: 'Calls',
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon icon="calls" color={color} size={size} focused={focused} />
        ),
      }}
    >
      {(props) => <CallsScreen {...props} theme={theme} />}
    </Tab.Screen>

    <Tab.Screen
      name="PeopleTab"
      options={{
        tabBarLabel: 'People',
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon icon="people" color={color} size={size} focused={focused} />
        ),
      }}
    >
      {(props) => <PeopleScreen {...props} theme={theme} />}
    </Tab.Screen>

    <Tab.Screen
      name="PositiveTab"
      options={{
        tabBarLabel: 'Positive',
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon icon="positive" color={color} size={size} focused={focused} />
        ),
      }}
    >
      {(props) => <PositiveScreen {...props} theme={theme} />}
    </Tab.Screen>

    <Tab.Screen
      name="SettingsTab"
      options={{
        
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon icon="settings" color={color} size={size} focused={focused} />
        ),
      }}
    >
      {() => <SettingsStackNavigator theme={theme} />}
    </Tab.Screen>
  </Tab.Navigator>
);

// Root Navigator
export const RootNavigator = ({ theme }) => {
  const [initializing, setInitializing] = React.useState(true);
  const [showSplash, setShowSplash] = React.useState(true);
  const isLoggedIn = require('../store/useAppStore').useAppStore((state) => state.isLoggedIn);
  const setIsLoggedIn = require('../store/useAppStore').useAppStore((state) => state.setIsLoggedIn);
  const setDomain = require('../store/useAppStore').useAppStore((state) => state.setDomain);
  const setUser = require('../store/useAppStore').useAppStore((state) => state.setUser);
  const setIsDarkMode = require('../store/useAppStore').useAppStore((state) => state.setIsDarkMode);

  React.useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const isLoggedInStored = await storage.getLoginStatus();
      const domain = await storage.getDomain();
      const user = await storage.getUser();
      const themeMode = await storage.getThemeMode();

      if (domain) {
        setDomain(domain);
      }
      if (user) {
        setUser(user);
      }

      // Default to dark mode if no theme mode is stored
      setIsDarkMode(themeMode !== null && themeMode !== undefined ? themeMode : true);
      setIsLoggedIn(isLoggedInStored);
    } catch (e) {
      console.error('Failed to restore session', e);
      // Set dark mode as default on error
      setIsDarkMode(true);
    } finally {
      setInitializing(false);
      setTimeout(() => setShowSplash(false), 2500);
    }
  };

  if (initializing || showSplash) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" options={{ headerShown: false }}>
          {(props) => <SplashScreen {...props} theme={theme} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoggedIn ? (
        <Stack.Screen
          name="MainApp"
          options={{
            headerShown: false,
          }}
        >
          {() => <AppStackNavigator theme={theme} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen
          name="Auth"
          options={{
            headerShown: false,
          }}
        >
          {() => <AuthStackNavigator theme={theme} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};
