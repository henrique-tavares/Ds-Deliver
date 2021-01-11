import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../Header';
import OrderCard from '../OrderCard';

export default function Orders() {
  return (
    <>
      <Header />
      <ScrollView style={ styles.container }>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%'
  }
});