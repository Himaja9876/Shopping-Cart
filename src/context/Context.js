import { createContext, useContext, useReducer } from 'react';
import { useState, useEffect } from 'react';
import { cartReducer, productReducer } from './Reducers';

const Cart = createContext();

const Context = ({ children }) => {

  const [products, setProducts] = useState([]);

  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsondata = await response.json();
      setProducts(jsondata?.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    dispatch({ type: 'SET_PRODUCTS', payload: products });
  }, [products]);

  console.log(products);

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byRating: 0,
    searchQuery: "",
  });

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  )
}

export default Context;

export const CartState = () => {
  return useContext(Cart);
}