import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { Entypo } from '@expo/vector-icons';

const tabBarBg='rgba(188, 159, 16, 0.67)'
export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'gray',
        headerShown: false,
        // tabBarButton: HapticTab,
        
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor:'transparent',
            elevation: 0,
            borderTopWidth: 0,
          },
          android: {
            backgroundColor: 'transparent',
            elevation: 0,
            borderTopWidth: 0,
          },
          default: {
                        backgroundColor:'transparent'

          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={Colors.primary} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Entypo name="paper-plane" size={24} color={Colors.primary} />,
        }}
      />
         <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color }) => <Entypo name="save" size={24} color={Colors.primary} />,
        }}
      />
    </Tabs>
  );
}
