/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Box from '../component/box';
import axios from 'axios';
import {AppText} from '../constant/text';

export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {count: number; rate: number};
  title: string;
  navigation: any;
}

const renderItem = ({item}: {item: Product}) => (
  <Pressable
    onPress={() => item.navigation.navigate('Product', {item})}
    style={styles.card}>
    <Image
      src={item.image}
      style={{width: 200, height: 200, borderRadius: 12, objectFit: 'cover'}}
    />
    <Text>{item.title}</Text>
    <Text>{item.price}</Text>
    <Text>{item.rating.rate}</Text>
  </Pressable>
);

const HomeScreen = ({navigation}: any) => {
  //consuming fake store endpoint.

  const [products, setProduct] = useState<Product[]>([]);
  const getProducts = useCallback(async function getProducts() {
    try {
      let response = await axios.get('https://fakestoreapi.com/products');
      // console.log(response.data);
      const actualData = response.data.slice(0, 10);
      let res = actualData.map((item: any) => ({
        ...item,
        navigation: navigation,
      }));
      setProduct(res);
    } catch (error) {
      console.log(error);
      setProduct([]);
    }
  }, []);

  useEffect(() => {
    getProducts();

    return () => {
      // cleanup
      getProducts();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchbox}>
        <TextInput placeholder={AppText.placeholder} style={styles.input} />
        <MaterialCommunityIcons name="cart" size={24} color="black" />
      </View>

      <View style={{gap: 12}}>
        <Text style={{color: '#000'}}>Shop by Category</Text>
        <ScrollView
          horizontal
          style={{
            flexDirection: 'row',
            display: 'flex',
            gap: 20,
          }}>
          <Box name="Category" />
          <Box name="Category" />
          <Box name="Category" />
          <Box name="Category" />
        </ScrollView>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        // numColumns={2}
        ListEmptyComponent={() => <Text>No data found</Text>}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchbox: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fefef3',
    paddingHorizontal: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: 'white',
    gap: 20,
  },
  card: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 12,
    gap: 16,
    backgroundColor: '#fefef3',
  },
});
