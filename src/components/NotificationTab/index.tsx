import { FlatList, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { firestoreNotificationHistory } from "../../lib/firebase/firebaseConfig";
import { Loading } from "../Loading";
import {HistoryNotification} from '../HistoryNotification';

type NotificationTabProps = {
    id: string;
}

type NotificationProps = {
    id: string;
    message: string;
};

export function NotificationTab({ id }: NotificationTabProps) {
    const [notifications,setNotifications] = useState<NotificationProps[]>([])

    function loadNotifications() {
        if(!id) return;
        firestoreNotificationHistory().where('equipmentId','==',id).get().then(x => {
            const allData = x.docs.map(doc => {
                const data = doc.data() as Omit<NotificationProps, 'id'>;

                return {
                    id: doc.id,
                    message: data.message
                } as NotificationProps;
            });

            setNotifications(allData);
        });
    }

    useEffect(() => {
        loadNotifications();

        return ()=> loadNotifications();
    }, [id]);

    return (
        <>
            {notifications.length < 1 ?
                <Loading /> :
                (
                    <FlatList
                        data={notifications}
                        keyExtractor={x => x.id}
                        renderItem={({ item, index }) => <HistoryNotification key={item.id} message={item.message} />}
                        showsVerticalScrollIndicator={false}
                    />
                )}
        </>
    )
}