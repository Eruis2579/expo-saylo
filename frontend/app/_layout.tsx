import axios from 'axios';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { Platform, ScrollView } from 'react-native';
import { AuthProvider } from '../context/AuthContext';
import "../global.css";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://sayloapp.com/api"
export default function RootLayout() {
  const [loaded] = useFonts({
    SFProBold: require('../assets/fonts/SFPRODISPLAYBOLD.ttf'),
    SFProSemiBold: require('../assets/fonts/SFPRODISPLAYSEMIBOLD.ttf'),
    SFProMedium: require('../assets/fonts/SFPRODISPLAYMEDIUM.ttf'),
    SFPro: require('../assets/fonts/SFPRODISPLAYREGULAR.ttf'),
    
    SFProRoundedBold: require('../assets/fonts/SFPROROUNDEDBOLD.ttf'),
    SFProRoundedSemiBold: require('../assets/fonts/SFPROROUNDEDSEMIBOLD.ttf'),
    SFProRoundedMedium: require('../assets/fonts/SFPROROUNDEDMEDIUM.ttf'),
    SFProRoundedRegular: require('../assets/fonts/SFPROROUNDEDREGULAR.ttf'),
  });
  if (!loaded) {
    return null;
  }
  const platform = Platform.OS;
  return (
    <AuthProvider>
        {
          platform == 'web' ?
            <Slot /> :
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Slot />
            </ScrollView>
        }
    </AuthProvider>
  );
}

