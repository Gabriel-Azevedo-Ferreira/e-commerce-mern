import Message from "../components/Message";
import React from "react";
import {
  Button,
  Card,
  Col,
  ListGroup,
  Row,
  Image,
  Form,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../slice/cartSlice";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems, totalPrice } = cart;

  const numItems = cartItems.reduce((a, c) => a + c.qty, 0);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (product) => {
    dispatch(removeFromCart(product._id));
  };

  const checkoutHadler = () => navigate("/login?redirect=/shipping");

  return (
    <Row>
      <Col md={8}>
        <h1> Shopping Cart </h1>
        <ListGroup variant="flush">
          {cartItems.length === 0 && (
            <Message>
              Cart it empty <Link to={"/"}>Go Back</Link>
            </Message>
          )}
          {cartItems.map((product) => (
            <ListGroup.Item key={product._id}>
              <Row>
                <Col md={2}>
                  <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={4}>
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </Col>
                <Col md={2}>${product.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={product.qty}
                    onChange={(e) =>
                      addToCartHandler(product, Number(e.target.value))
                    }
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => removeFromCartHandler(product)}
                  >
                    <FaTrash />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2> Subtotal ({numItems}) items </h2>${totalPrice}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button onClick={checkoutHadler}>Proceed to checkout</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
