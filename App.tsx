import React from "react";
import { MoviesProvider } from "./contexts/movies";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Home from "./components/Home";

export default function App() {
  const [fontsLoaded, error] = useFonts({
    Marmelat500Medium: require("./assets/fonts/marmelat/marmelat-medium.otf"),
    Marmelat700Bold: require("./assets/fonts/marmelat/marmelat-bold.otf")
  });

  if (!fontsLoaded && !error) {
    return <AppLoading />;
  }

  return (
    <MoviesProvider>
      <Home />
    </MoviesProvider>
  );
}
