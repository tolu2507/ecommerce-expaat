import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable, Alert} from 'react-native';
import {Product} from './HomeScreen';
import {Paystack} from 'react-native-paystack-webview';

const ProductScreen = ({route}: any) => {
  const {item}: {item: Product} = route.params;
  const [number, setNumber] = useState(0);
  const [payment, setPayment] = useState(false);

  const increment = () => setNumber(val => val + 1);
  const decrement = () => setNumber(val => val - 1);

  function getPrice(): number {
    let answer = number * +item.price;
    console.log(answer);
    return answer;
  }

  return (
    <View style={{padding: 12, gap: 20}}>
      <Image src={item.image} style={styles.image} />
      <Text>title: {item.title}</Text>
      <Text>Price: {item.price}</Text>
      <Text>DDescription : {item.description}</Text>
      <View style={{flexDirection: 'row', gap: 12}}>
        <Pressable
          onPress={increment}
          style={{
            width: 20,
            height: 20,
            borderRadius: 30,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>+</Text>
        </Pressable>
        <Text>{number}</Text>
        <Pressable
          onPress={decrement}
          style={{
            width: 20,
            height: 20,
            borderRadius: 30,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>-</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => setPayment(true)}
        style={{
          // width: 20,
          height: 50,
          borderRadius: 30,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#fff'}}>Add to cart</Text>
      </Pressable>

      {payment && (
        <View style={{flex: 1}}>
          <Paystack
            paystackKey={'pk_test_43f3b99123587190f8526bd34f618be97ec95826'}
            billingEmail={'expaat@gmail.com'}
            amount={getPrice()}
            onCancel={() => {
              console.log('cancelled');
              Alert.alert('unsuccessful', 'Payment unsuccessfully made');
            }}
            onSuccess={() => {
              console.log('Successful');
              Alert.alert('Successful', 'Payment successfully made');
            }}
            autoStart={true}
            activityIndicatorColor="green"
            currency="NGN"
          />
        </View>
      )}
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  image: {
    // width: 200,
    height: 500,
  },
});
