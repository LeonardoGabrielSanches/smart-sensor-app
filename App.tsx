import React from "react";
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";
import { Routes } from "./src/routes/index.routes";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
