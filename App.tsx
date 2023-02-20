import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import TabNavigator from "./navigation/TabNavigator";
import store from "./store";

const Root = () => {
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <Root />
        </Provider>
    );
};

export default App;
