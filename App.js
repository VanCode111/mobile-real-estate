import React, { Suspense } from "react";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import Events from "./components/Events/Events";
import { Route, Routes, NativeRouter } from "react-router-native";
import Add from "./components/Add";
import { View, TextField, Text, Button } from "react-native-ui-lib";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container} paddingH-10 paddingT-10>
        <NativeRouter>
          <Routes>
            <Route path="/" element={<Events />} />
            <Route path="/add" element={<Add />} />
          </Routes>
        </NativeRouter>
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    height: "100%",
  },
});
