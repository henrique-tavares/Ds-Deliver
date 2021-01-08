import { useEffect, useState } from 'react';
import ProductsList from './ProductsList';
import StepsHeader from './StepsHeader';
import OrderLocation from './OrderLocation';
import { OrderLocationData, Product } from './types';
import { fetchProducts } from '../api';

import './styles.css';

function Orders() {
  const [ products, setProducts ] = useState<Product[]>([]);
  const [ orderLocation, setOrderLocation ] = useState<OrderLocationData>();

  console.log(products);

  useEffect(() => {
    fetchProducts()
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="orders-container">
      <StepsHeader />
      <ProductsList products={ products } />
      <OrderLocation onChangeLocation={ (location: OrderLocationData) => setOrderLocation(location) } />
    </div>
  );
}

export default Orders;