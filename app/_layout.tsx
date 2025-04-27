import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient'; 
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent', 
    },
  };

  return (

    <ThemeProvider value={customTheme}>
      <LinearGradient
        colors={[' rgb(13, 2, 54)', 'rgb(109, 99, 99)']} 
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }}   
        style={{ flex: 1 }}   
      >
        <Stack screenOptions={{headerShown:false}}>
                      <Stack.Screen name="(tabs)" options={{ headerShown: false ,contentStyle:{backgroundColor:'transparent'}}} />

            <Stack.Screen name="user"  />

          
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </LinearGradient>
    </ThemeProvider>

  );
}