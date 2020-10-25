import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Heading from "../components/Heading";
import Product from '../components/Product';

export default function StandScreen({ route, navigation }) {
  const [products, setProducts] = useState([])
  const { stand } = route.params;

  useEffect(()=> {
    (async () =>  {
      const url = `https://prueba2020.monoku.com/api/productos/?${new URLSearchParams({stand: stand.id})}`;
      const response = await fetch(url);
      const data = await response.json()
      setProducts(data)
    })()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Heading title="¡Felicitaciones!" subtitle="Escoge una de nuestras prendas únicas"/>

      <View style={styles.productList}>
        {products.map((product)=> {
          return <Product key={product.id} product={product} />
        })}
      </View>

      <Button title="Atrás" onPress={() => navigation.navigate('Home')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productList: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 20,
  }
});