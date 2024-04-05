import { CartState } from '../context/Context';
import React from 'react';
import SingleProduct from './SingleProduct';
import './styles.css';
import Filters from './Filters';

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.stock);
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return sortedProducts;
  };

  return (
    <div className='home'>
      <Filters />
      <div className='row' style={{ paddingLeft: 318, paddingRight: 5, width: '100%', backgroundColor: '#f0e6e8' }}>
        {transformProducts().map((prod) => (
          <div className='col-md-3' key={prod.id}>
            <SingleProduct prod={prod} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
