import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProductsList from './ProductsList';
import StepsHeader from './StepsHeader';
import OrderLocation from './OrderLocation';
import OrderSummary from './OrderSummary';
import Footer from '../Footer';
import { OrderLocationData, Product } from './types';
import { fetchProducts, saveOrder } from '../api';

import './styles.css';

function Orders() {
  const [ products, setProducts ] = useState<Product[]>([]);
  const [ selectedProducts, setSelectedProducts ] = useState<Product[]>([]);
  const [ orderLocation, setOrderLocation ] = useState<OrderLocationData>();

  const handleSelectProduct = (product: Product) => {
    const isAlreadySelected = selectedProducts.some(item => item.id === product.id);

    if (isAlreadySelected) {
      const selected = selectedProducts.filter(item => item.id !== product.id);
      setSelectedProducts(selected);
    } else {
      setSelectedProducts(previous => [ ...previous, product ]);
    }
  };

  const handleSubmit = () => {
    const productsIds = selectedProducts.map(({ id }) => ({ id }));
    const payload = {
      ...orderLocation!,
      products: productsIds
    };

    saveOrder(payload)
      .then(() => {
        toast.error('Pedido enviado com sucesso!');
        setSelectedProducts([]);
      })
      .catch(() => {
        toast.warning('Erro ao enviar pedido');
      });
  };

  useEffect(() => {
    fetchProducts()
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <div className="orders-container">
        <StepsHeader />
        <ProductsList
          products={ products }
          selectedProducts={ selectedProducts }
          onSelectChange={ handleSelectProduct }
        />
        <OrderLocation onChangeLocation={ (location: OrderLocationData) => setOrderLocation(location) } />
        <OrderSummary
          amount={ selectedProducts.length }
          totalPrice={ selectedProducts.reduce((a, b) => a + b.price, 0) }
          onSubmit={ handleSubmit }
        />
      </div>
      <Footer />
    </>
  );
}

export default Orders;