import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Define a custom theme (optional, for other theme properties)
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
        start={{ x: 0, y: 0 }} // Top-left
        end={{ x: 1, y: 1 }}   // Bottom-right (135deg equivalent)
        style={{ flex: 1 }}    // Ensure it fills the screen
      >
        <Stack screenOptions={{headerShown:false}}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false ,contentStyle:{backgroundColor:'transparent'}}} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </LinearGradient>
    </ThemeProvider>

  );
}