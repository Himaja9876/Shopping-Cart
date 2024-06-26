import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup style={{ marginLeft: '-151px' }}>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row style={{ height: 70, width: 1050 }}>
                <Col md={2}>
                  <Image style={{ height: 70, width: 80 }} src={prod.images[0]} alt={prod.title} fluid rounded />
                </Col>
                <Col md={2}>
                  <span style={{ fontSize: 15 }}>{prod.title}</span>
                </Col>
                <Col style={{ fontSize: 15 }} md={2}>$ {prod.price}</Col>
                <Col md={2}>
                  <Rating style={{ fontSize: 15 }} rating={prod.rating} />
                </Col>
                <Col md={2}>
                  <Form.Control style={{ height: 30, width: 80 }}
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.stock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="15px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span style={{ fontSize: 18 }} className="title" >Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 15 }}>Total: ₹ {total}</span>
        <Button style={{ fontSize: 15 }} className="btn btn-warning" type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div >
  );
};

export default Cart;
