import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';

export default function GradientButton({ isHover }: { isHover: boolean }) {
    const { scaleFont } = useAuth();
  return (
    <LinearGradient
      colors={isHover ? ['#EBD2FE', '#FBB9DD'] : ['#181818', '#181818']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{
        width: scaleFont(49),
        height: scaleFont(49),
        borderRadius: scaleFont(10),
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Ionicons name="arrow-forward" size={scaleFont(17)} color="white" />
    </LinearGradient>
  );
}