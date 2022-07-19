import { Box, Text, ITextProps } from "native-base";
import { ReactElement } from "react";

type TextWithIconProps = {
    text: string;
    icon: ReactElement;
    width?: string;
} & ITextProps;

export function TextWithIcon({ icon, text, width = "full", ...rest }: TextWithIconProps) {
    return (
        <Box alignItems="center" flexDir="row" w={width}>
            {icon}
            <Text {...rest} ml="1" >{text}</Text>
        </Box>
    );
}