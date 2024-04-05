import React from 'react';
import { Container, FormControl, Navbar, Nav, Dropdown, Badge, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa"
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context';


const Header = () => {
  const {
    state: { cart }, dispatch, productDispatch, } = CartState();

  return (
    <Navbar bg='dark' variant='dark' position='fixed' style={{ height: 80 }}>
      <Container >

        <Navbar.Brand style={{ paddingLeft: 14 }}>
          <img src="/logo.png" alt="Logo" style={{ marginRight: 10, height: 20, width: 20 }} />
          <Link to='/'><b>InnoCaption</b></Link>
        </Navbar.Brand>

        <Navbar.Text className="search">
          <FormControl
            style={{ width: 700 }}
            type="search"
            placeholder="Search a product..."
            className="m-auto"
            aria-label="Search"
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
        </Navbar.Text>

        <Nav>
          <Dropdown alignright="true">
            <Dropdown.Toggle variant="secondary">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge className="btn btn-secondary">{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartitem" key={prod.id}>
                      <img
                        src={prod.images[0]}
                        className="cartItemImg"
                        alt={prod.title}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.title}</span>
                        <span>$ {prod.price}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>

      </Container>
    </Navbar>
  )
}

export default Header