import { Text } from "native-base";

type NotificationTabProps = {
    id: string;
}

export function NotificationTab({ id }: NotificationTabProps) {
    return (
        <Text>Aba notificações {id}</Text>
    );
}