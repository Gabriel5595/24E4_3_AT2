import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GalleryScreen from "./screens/GalleryScreen";
import ImageDetailScreen from "./screens/ImageDetailScreen"; // Certifique-se de ter esta tela

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GalleryScreen">
        <Stack.Screen
          name="GalleryScreen"
          component={GalleryScreen}
          options={{ title: "Galeria NASA" }}
        />
        <Stack.Screen
          name="ImageDetailScreen"
          component={ImageDetailScreen}
          options={{ title: "Detalhes da Imagem" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
