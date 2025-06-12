import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { Slot } from 'expo-router';
import { Dimensions, Platform, ScrollView } from 'react-native';
import { AuthProvider } from '../context/AuthContext';
import "../global.css";
export default function RootLayout() {
  const [loaded] = useFonts({
    SFPro: require('../assets/fonts/SFPRODISPLAYREGULAR.ttf'),
    SFProMedium: require('../assets/fonts/SFPRODISPLAYMEDIUM.ttf'),
    SFProSemiBold: require('../assets/fonts/SFPRODISPLAYSEMIBOLD.ttf'),
    SFProBold: require('../assets/fonts/SFPRODISPLAYBOLD.ttf'),
  });
  if (!loaded) {
    return null;
  }
  const platform = Platform.OS;
  return (
    <AuthProvider>
      <LinearGradient
        colors={['#FBF1FE', '#FFEAF5']}
        style={{
          flex: 1,
          overflowY: 'auto',
          height: Dimensions.get('window').height,
        }}
      >
        {
          platform == 'web' ?
            <Slot /> :
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Slot />
            </ScrollView>
        }
      </LinearGradient>
    </AuthProvider>
  );
}

