import { Box, Center, Pressable, useColorModeValue } from "native-base";
import { useMemo, useState } from "react";
import { Animated, Dimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { HistoryTab } from "../HistoryTab";
import { NotificationTab } from "../NotificationTab";

type DeviceTabProps = {
    id: string;
}

const initialLayout = {
    width: Dimensions.get('window').width
};

export function DeviceTabs({ id }: DeviceTabProps) {
    const [index, setIndex] = useState(0);
    const [routes] = useState(
        [
            {
                key: 'history',
                title: 'Histórico'
            },
            {
                key: 'notification',
                title: 'Notificações'
            }
        ]
    );

    const renderScene = SceneMap({
        history: () => <HistoryTab id={id} />,
        notification: () => <NotificationTab id={id} />,
    });

    const tabWidth = useMemo(() => {
        return `${100 / routes.length}%`;
    }, [routes])

    const renderTabBar = (props: any) => {
        return (
            <Box flexDirection="row">
                {props.navigationState.routes.map((route: any, i: number) => {

                    const borderColor = index === i ? '#072A6C' : 'coolGray.200';

                    return (
                        <Box key={i} borderBottomWidth="3" borderColor={borderColor} py="3" width={tabWidth}>
                            <Pressable onPress={() => { setIndex(i); }}>
                                <Animated.Text style={{ alignSelf: "center" }}>
                                    {route.title}
                                </Animated.Text>
                            </Pressable>
                        </Box>
                    );
                })}
            </Box>
        );
    };

    return <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
    />;
}
