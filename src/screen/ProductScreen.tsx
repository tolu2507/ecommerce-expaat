import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable, Alert} from 'react-native';
import {Product} from './HomeScreen';
import {Paystack} from 'react-native-paystack-webview';

const ProductScreen = ({route}: any) => {
  const {prop}: {prop: Product} = route.params;
  const [number, setNumber] = useState(1);
  const [payment, setPayment] = useState(false);
  const [payments, setPayments] = useState(false);
  let item = prop;

  const increment = () => setNumber(val => val + 1);
  const decrement = () => setNumber(val => val - 1);

  function getPrice(): number {
    let answer = number * +item.price;
    console.log(answer);
    return answer;
  }

  return (
    <View style={{padding: 12, gap: 20, backgroundColor: '#000', flex: 1}}>
      <Image src={item.image} style={styles.image} />
      <Text style={{color: 'white', fontSize: 18}}>Title: {item.title}</Text>
      <Text style={{color: 'white', fontSize: 16}}>Price: {item.price}</Text>
      <Text style={{color: 'white', fontSize: 14}}>
        Description : {item.description}
      </Text>
      <View style={{flexDirection: 'row', gap: 12}}>
        <Pressable
          onPress={increment}
          style={{
            width: 20,
            height: 20,
            borderRadius: 30,
            backgroundColor: '#f3f0f0',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#0f0f0f'}}>+</Text>
        </Pressable>
        <Text style={{color: 'white', fontSize: 18}}>{number}</Text>
        <Pressable
          onPress={decrement}
          style={{
            width: 20,
            height: 20,
            borderRadius: 30,
            backgroundColor: '#f7f4f4',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#0e0d0d'}}>-</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => setPayment(true)}
        // disabled={number <= 1}
        style={{
          // width: 20,
          height: 50,
          borderRadius: 30,
          backgroundColor: '#f5efef',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#161616'}}>Buy</Text>
      </Pressable>

      {payment && (
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000073',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 20,
              gap: 12,
            }}>
            <Text>Are you sure you want to make this payment ? </Text>
            <Pressable
              onPress={() => setPayments(true)}
              style={{
                // width: 20,
                height: 50,
                borderRadius: 30,
                backgroundColor: '#a38181',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#161616'}}>Yes</Text>
            </Pressable>
          </View>
        </View>
      )}

      {payments && (
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
              setPayment(false);
              setPayments(false);
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
