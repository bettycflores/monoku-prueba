import React, { useCallback } from "react";
import { Alert, Image, View, Button } from "react-native";
import Heading from "../components/Heading";

export default function OrderConfirmScreen({ route, navigation }) {
  const { product, option } = route.params;

  const confirm = useCallback(() => {
    (async () => {
      const url = `https://prueba2020.monoku.com/api/opciones-producto/${option.id}/solicitar/`;
      const response = await fetch(url, { method: "POST" });

      if (response.status == 200) {
        const data = await response.json();
        navigation.navigate("OrderCompleted");
      } else {
        Alert.alert("¡Uy, lo siento!", "Hubo un problema al hacer tu pedido.");
      }
    })();
  }, [product, option]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ marginTop: 80, alignItems: "center" }}>
        <Heading heading="¡Ya casi terminas!" />
      </View>

      <View style={{flex: 1, justifyContent: "center"}}>
      <View
        style={{
          borderRadius: 320,
          height: 320,
          width: 320,
          margin: 10,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#d5c6ed",
        }}
      >
        <Image
          source={require("../assets/logo_monoku.png")}
          style={{ height: 150, width: 150 }}
        />
      </View>
      </View>
      <View style={{ marginBottom: 40, marginLeft: 20, marginRight: 20 }}>
        <Button
          title="Pedir"
          onPress={confirm}
          style={{ marginBottom: 10 }}
        />
        <Button title="Atrás" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}