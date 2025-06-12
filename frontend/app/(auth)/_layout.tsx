import { LoginFooter } from '@/components/Footers/LoginFooter';
import { Bar } from '@/components/Headers/Bar';
import { LoginHeader } from '@/components/Headers/LoginHeader';
import { useAuth } from '@/context/AuthContext';
import { Slot, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
export default function AuthLayout() {
  const { scaleFont } = useAuth();
  const pathname = usePathname();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (pathname === '/signup') {
      setCurrent(0);
    } else if (pathname === '/oauth'||pathname === '/login') {
      setCurrent(1);
    }else if(pathname=== '/welcome'){
      setCurrent(2);
    }else{
      setCurrent(4);
    }
  }, [pathname]);
  return (
    <>
    <View style={{
      paddingTop: scaleFont(71),
      paddingBottom: scaleFont(24),
      minHeight:Dimensions.get('window').height,
    }}>

      <View style={{
        paddingHorizontal: scaleFont(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

      }}>
        <LoginHeader />
        {current<3 && <Bar current={current} />}
      </View>
      <Slot />
      {current<2 && <LoginFooter />}
    </View>
    </>
  );
}

