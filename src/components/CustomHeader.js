import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ 
  title, 
  showBackButton = false, 
  backgroundColor = '#0f172a',
  textColor = '#f1f5f9',
  onBackPress,
  rightComponent,
  transparent = false
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[
      styles.headerContainer,
      { 
        backgroundColor: transparent ? 'transparent' : backgroundColor,
        paddingTop: Platform.OS === 'ios' ? insets.top : 0,
      }
    ]}>
      <View style={styles.headerContent}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <Text style={[styles.backButtonText, { color: textColor }]}>
              ←
            </Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: textColor }]}>
            {title}
          </Text>
        </View>

        {rightComponent && (
          <View style={styles.rightComponent}>
            {rightComponent}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#334155',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 64,
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  rightComponent: {
    marginLeft: 12,
    minWidth: 40,
    alignItems: 'flex-end',
  },
});

export default CustomHeader;
