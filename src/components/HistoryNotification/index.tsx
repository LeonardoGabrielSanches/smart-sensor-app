import { Box, Row, Text} from "native-base";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type HistoryItemProps = {
    message: string;
};

export function HistoryNotification({ message }: HistoryItemProps) {
    return (
        <Box padding="2" borderWidth="1.5">
            <Row w="full" alignItems="center" justifyContent="space-between">
                <MaterialIcons name="warning" size={16} />
                <Text ml="2" fontSize="lg" width="100%">
                    {message}
                </Text>
            </Row>
        </Box>
    )
}