import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Constants from "expo-constants";
import React from "react";
import { View } from "react-native";
import Training from "../screens/Training";
import Word from "../screens/Word";
import DictionaryNavigator from "./DictionaryNavigator";
import Screen from "./Screen";

const Tab = createBottomTabNavigator();

const Routes = [
    {
        name: "Dictionary",
        label: "Dictionnaire",
        component: DictionaryNavigator,
        icon: "book" as "book",
    },
    {
        name: "Word",
        label: "Fiche mot",
        component: Word,
        icon: "file-text-o" as "file-text-o",
    },
    {
        name: "Training",
        label: "Entraînement",
        component: Training,
        icon: "gamepad" as "gamepad",
    },
];

const TabNavigator = () => (
    <Tab.Navigator
        screenOptions={{
            header: () => (
                <View
                    style={{
                        paddingTop: Constants.statusBarHeight + 8,
                        backgroundColor: "#ffffff",
                    }}
                />
            ),
            tabBarActiveTintColor: "#000000",
            tabBarInactiveTintColor: "#bfbfbf",
            tabBarLabelStyle: { fontSize: 14 },
            tabBarHideOnKeyboard: true,
        }}
    >
        {Routes.map(route => (
            <Tab.Screen
                key={route.name}
                name={route.name}
                options={{
                    tabBarLabel: route.label,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name={route.icon} color={color} size={size} />
                    ),
                }}
            >
                {() => <Screen component={route.component} />}
            </Tab.Screen>
        ))}
    </Tab.Navigator>
);

export default TabNavigator;
