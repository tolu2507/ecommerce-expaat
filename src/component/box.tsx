/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, View} from 'react-native';

export default function Box({name}: {name: string}) {
  return (
    <View
      style={{
        width: 100,
        paddingHorizontal: 20,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fefef3 ',
        borderWidth: 1,
        borderRadius: 12,
      }}>
      <Image
        src="https://images.creativefabrica.com/products/previews/2024/02/12/rY0F8vMOr/2cGJhcJ2myedarLj7hipOY8DZ1Q-desktop.jpg"
        style={{width: 70, height: 70, borderRadius: 70, borderWidth: 1}}
      />
      <Text>{name}</Text>
    </View>
  );
}
