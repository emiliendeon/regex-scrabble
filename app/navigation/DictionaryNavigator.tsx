import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../screens/Home";
import Screen from "./Screen";

const Stack = createNativeStackNavigator();

const Routes = [
    {
        name: "Home",
        component: Home,
    },
];

const DictionaryNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        {Routes.map(route => (
            <Stack.Screen key={route.name} name={route.name}>
                {() => <Screen component={route.component} />}
            </Stack.Screen>
        ))}
    </Stack.Navigator>
);

export default DictionaryNavigator;
