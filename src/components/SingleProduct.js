import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { CartState } from '../context/Context';
import Rating from './Rating';

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="products">
      <Card className='card'>
        <Card.Img style={{
          height: 270, width: 310, paddingLeft: 17, paddingTop: 17
        }} variant="top" src={prod.images[0]} alt={prod.name} />
        <Card.Body>
          <Card.Title>{prod.title}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <div className='description'>{prod.description}</div>
            <div className='price'>Price: ${prod.price}</div>
            <div>{prod.rating} <Rating rating={prod.rating} /></div>
          </Card.Subtitle>
          {cart.some((p) => p.id === prod.id) ? (
            <Button
              variant="secondary"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              variant="warning"
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
              disabled={!prod.stock}
            >
              {!prod.stock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default SingleProduct