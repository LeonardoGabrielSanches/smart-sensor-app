import { Box, Row, Text, useTheme } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fromUnixTime, format } from 'date-fns'

import { HistoryProps } from "../HistoryTab";
import { TextWithIcon } from "../TextWithIcon";

type HistoryItemProps = {
    data: HistoryProps;
    isActualHistory: boolean;
};

export function HistoryItem({ data, isActualHistory }: HistoryItemProps) {
    const { colors } = useTheme();

    const borderColor = isActualHistory ? colors.blue[800] : colors.gray[300];

    return (
        <Box padding="2" borderWidth="1.5" borderColor={borderColor}>
            <Row w="full" alignItems="center" justifyContent="space-between">
                <Text fontSize="sm" width="20%">
                    {format(fromUnixTime(data?.timestamp), "dd/MM/yy hh:mm:ss")}
                </Text>

                <TextWithIcon
                    fontSize="sm"
                    text={data?.humidity?.toFixed(2)}
                    icon={<MaterialCommunityIcons name="water-outline" size={16} />}
                    width="20%"
                />

                <TextWithIcon
                    fontSize="sm"
                    text={data?.room_temperature?.toFixed(2)}
                    icon={<MaterialIcons name="meeting-room" size={16} />}
                    width="20%"
                />

                <TextWithIcon
                    fontSize="sm"
                    text={data?.temperature?.toFixed(2)}
                    icon={<MaterialCommunityIcons name="engine-outline" size={16} />}
                    width="20%"
                />

                <TextWithIcon
                    fontSize="sm"
                    text={data?.vibration?.toFixed(2)}
                    icon={<MaterialCommunityIcons name="vibrate" size={16} />}
                    width="20%"
                />
            </Row>
        </Box>
    )
}