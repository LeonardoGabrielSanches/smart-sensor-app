import { Box, Center, Column, Divider, Image, Row, Text } from "native-base";
import { useEffect, useState } from "react";
import { DeviceTabs } from "../../components/DeviceTabs";
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

type HistoryProps = {
    id: string;
    humidity: number;
    room_temperature: number;
    temperature: number;
    timestamp: number;
    vibration: number;
}

export function Device({ id }: DeviceProps) {
    const [device, setDevice] = useState<DeviceStateProps>({} as DeviceStateProps);
    const [history, setHistory] = useState<HistoryProps[]>([]);
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

    // function loadDeviceHistory() {
    //     firestoreHistoryByDevice(id).onSnapshot(snapshot => {
    //         const historyData = snapshot.docs.map(x => {
    //             const data = x.data() as Omit<HistoryProps, 'id'>;

    //             return {
    //                 id: x.id,
    //                 humidity: data.humidity,
    //                 room_temperature: data.room_temperature,
    //                 temperature: data.temperature,
    //                 timestamp: data.timestamp,
    //                 vibration: data.vibration
    //             } as HistoryProps
    //         });

    //         setHistory(historyData.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1));
    //     });
    // }

    function loadDeviceLastHistory() {
        firestoreHistoryByDevice(id).orderBy('timestamp', 'asc').limit(1).onSnapshot(snapshot => {
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
                            text={lastHistory.humidity.toFixed(2)}
                            icon="chevron-up"
                            iconSize={36}
                        />

                        <TextWithIcon
                            fontSize="lg"
                            text={lastHistory.room_temperature.toFixed(2)}
                            icon="chevron-up"
                            iconSize={36}
                        />
                    </Column>

                    <Column>
                        <TextWithIcon
                            fontSize="lg"
                            text={lastHistory.temperature.toFixed(2)}
                            icon="chevron-up"
                            iconSize={36}
                        />

                        <TextWithIcon
                            fontSize="lg"
                            text={lastHistory.vibration.toFixed(2)}
                            icon="chevron-up"
                            iconSize={36}
                        />

                    </Column>
                </Box>
            </Box>

            <Divider />

            <DeviceTabs />
        </Center>
    );
}