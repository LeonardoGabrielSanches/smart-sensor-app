import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Loading } from '../components/Loading';
import { firestoreDevices } from '../lib/firebase/firebaseConfig';
import { Device } from '../pages/Device';

const Tab = createBottomTabNavigator();

type DeviceProps = {
    id: string;
    name: string;
    icon: string;
}

export function Routes() {
    const [screens, setScreens] = useState<DeviceProps[]>([] as DeviceProps[]);

    useEffect(() => {
        firestoreDevices.get().then(x => {
            const allDevices = x.docs.map(y => {
                const device = y.data();

                return {
                    id: y.id,
                    name: device.name,
                    icon: device.icon
                } as DeviceProps
            });

            setScreens(allDevices);
        });
    }, []);

    return (
        <>
            {screens.length < 1 ?
                <Loading /> :
                (
                    <>
                        <Tab.Navigator screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                return <MaterialCommunityIcons name={screens.find(x => x.name === route.name)?.icon} size={size} color={color} />;
                            },
                            tabBarActiveTintColor: "#072A6C",
                            tabBarInactiveTintColor: 'gray',
                            headerShown: false
                        })}>
                            {screens.map(x => (
                                <Tab.Screen key={x.id} name={x.name}>
                                    {() => <Device id={x.id} />}
                                </Tab.Screen>
                            ))}
                        </Tab.Navigator>
                    </>
                )}
        </>
    );
}