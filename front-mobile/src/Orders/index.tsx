import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { fetchOrders } from '../api';
import Header from '../Header';
import OrderCard from '../OrderCard';
import { Order } from '../types';

export default function Orders() {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [ orders, setOrders ] = useState<Order[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);

  function handleOnPress(order: Order) {
    navigation.navigate('OrderDetails', {
      order
    });
  }


  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      fetchOrders()
        .then(response => setOrders(response.data))
        .catch(() => Alert.alert('Houve um erro ao buscar os pedidos!'))
        .finally(() => setIsLoading(false));
    }
  }, [ isFocused ]);

  return (
    <>
      <Header />
      {isLoading ? (
        <View style={ styles.loadingContainer }>
          <ActivityIndicator color="#DA5C5C" size={ 80 } />
        </View>
      ) : (
          <ScrollView style={ styles.container }>
            { orders.map(order => (
              <TouchableWithoutFeedback key={ order.id } onPress={ () => handleOnPress(order) }>
                <OrderCard order={ order } />
              </TouchableWithoutFeedback>
            )) }
          </ScrollView>) }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
  }
});