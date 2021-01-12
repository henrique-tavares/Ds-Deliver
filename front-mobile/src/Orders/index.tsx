import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
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
  const [ isRefreshing, setIsRefreshing ] = useState(false);

  function handleOnPress(order: Order) {
    navigation.navigate('OrderDetails', {
      order
    });
  }

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchOrders()
      .then(response => setOrders(response.data))
      .catch(() => Alert.alert('Houve um erro ao buscar os pedidos!'))
      .finally(() => setIsRefreshing(false));
  }, []);


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
          <ScrollView
            contentContainerStyle={ styles.container }
            refreshControl={
              <RefreshControl
                refreshing={ isRefreshing }
                onRefresh={ onRefresh }
                colors={ [ '#DA5C5C' ] }
                tintColor={ '#DA5C5C' }
              /> }
          >
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
    padding: '5%'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
  }
});