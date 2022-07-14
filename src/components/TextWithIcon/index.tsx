import { Box, Text, ITextProps } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type TextWithIconProps = {
    text: string;
    icon: string;
    iconSize: number;
} & ITextProps;

export function TextWithIcon({ icon, iconSize, text, ...rest }: TextWithIconProps) {
    return (
        <Box alignItems="center" flexDir="row" w="full">
            <MaterialCommunityIcons name={icon} size={iconSize} />
            <Text {...rest} >{text}</Text>
        </Box>
    );
}