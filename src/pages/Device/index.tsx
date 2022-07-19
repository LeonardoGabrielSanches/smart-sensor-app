import { Box, Center, Column, Divider, Image, Text } from "native-base";
import { useEffect, useState } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { DeviceTabs } from "../../components/DeviceTabs";
import { HistoryProps } from "../../components/HistoryTab";
import { TextWithIcon } from "../../components/TextWithIcon";

import { firestoreDevices, firestoreHistoryByDevice } from "../../lib/firebase/firebaseConfig";

type DeviceProps = {
    id: string;
}

type DeviceStateProps = {
    id: string;
    name: string;
    imageUrl: string;
}



export function Device({ id }: DeviceProps) {
    const [device, setDevice] = useState<DeviceStateProps>({} as DeviceStateProps);
    const [lastHistory, setLastHistory] = useState<HistoryProps>({} as HistoryProps);

    function loadDevice() {
        firestoreDevices.doc(id).get().then(x => {
            const data = x.data() as Omit<DeviceStateProps, 'id'>;

            setDevice({
                id: x.id,
                name: data?.name,
                imageUrl: data?.imageUrl
            });
        });
    }

    function loadDeviceLastHistory() {
        firestoreHistoryByDevice(id).orderBy('timestamp', 'desc').limit(1).onSnapshot(snapshot => {
            const doc = snapshot.docs[0]
            const data = doc.data() as Omit<HistoryProps, 'id'>;

            setLastHistory({
                id: doc.id,
                humidity: data.humidity,
                room_temperature: data.room_temperature,
                temperature: data.temperature,
                timestamp: data.timestamp,
                vibration: data.vibration
            });
        })
    }

    useEffect(() => {
        loadDevice();
        loadDeviceLastHistory();
    }, [id]);

    return (
        <Center height="full" width="full">
            <Box alignItems="center" height="70%" justifyContent="center" px="4" w="full">
                <Image size="48" source={{ uri: device.imageUrl }} alt={device.name} />
                <Text fontSize="2xl" fontWeight="bold" backgroundColor="blue.100" textAlign="center">{device.name}</Text>

                <Box
                    mt="10"
                    alignItems="center"
                    justifyContent="space-around"
                    h="10%"
                    flexDir="row"
                    w="full"
                >
                    <Column>
                        <TextWithIcon
                            fontSize="lg"
                            text={lastHistory?.humidity?.toFixed(2)}
                            icon={<MaterialCommunityIcons name="water-outline" size={24} />}
                        />

                        <TextWithIcon
                            fontSize="lg"
                            text={lastHistory?.room_temperature?.toFixed(2)}
                            icon={<MaterialIcons name="meeting-room" size={24} />}
                        />
                    </Column>

                    <Column>
                        <TextWithIcon
                            fontSize="lg"
                            text={lastHistory?.temperature?.toFixed(2)}
                            icon={<MaterialCommunityIcons name="engine-outline" size={24} />}
                        />

                        <TextWithIcon
                            fontSize="lg"
                            text={lastHistory?.vibration?.toFixed(2)}
                            icon={<MaterialCommunityIcons name="vibrate" size={24} />}
                        />

                    </Column>
                </Box>
            </Box>

            <Divider />

            <DeviceTabs id={device.id} />
        </Center>
    );
}