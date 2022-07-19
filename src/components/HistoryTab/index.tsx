import { FlatList, Text } from "native-base";
import { useEffect, useState } from "react";
import { firestoreHistoryByDevice } from "../../lib/firebase/firebaseConfig";
import { HistoryItem } from "../HistoryItem";
import { Loading } from "../Loading";

type HistoryTabProps = {
    id: string;
}

export type HistoryProps = {
    id: string;
    humidity: number;
    room_temperature: number;
    temperature: number;
    timestamp: number;
    vibration: number;
}

export function HistoryTab({ id }: HistoryTabProps) {
    const [history, setHistory] = useState<HistoryProps[]>([]);

    function loadHistory() {
        firestoreHistoryByDevice(id).orderBy('timestamp', 'desc').get().then(x => {
            const allData = x.docs.map(doc => {
                const data = doc.data() as Omit<HistoryProps, 'id'>;

                return {
                    id: doc.id,
                    humidity: data.humidity,
                    room_temperature: data.room_temperature,
                    temperature: data.temperature,
                    timestamp: data.timestamp,
                    vibration: data.vibration
                } as HistoryProps;
            });

            setHistory(allData);
        });
    }

    useEffect(() => {
        loadHistory();
    }, [id]);

    return (
        <>
            {history.length < 1 ?
                <Loading /> :
                (
                    <FlatList
                        data={history}
                        keyExtractor={x => x.id}
                        renderItem={({ item, index }) => <HistoryItem data={item} isActualHistory={index === 0} />}
                        showsVerticalScrollIndicator={false}
                    />
                )}
        </>
    );
}