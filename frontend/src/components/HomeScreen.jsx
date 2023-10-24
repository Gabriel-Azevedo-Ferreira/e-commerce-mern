import products from "../products";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Product from "./Product";

const HomeScreen = () => {
  return (
    <div>
      Lastest Products
      <Container>
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product product={product}/>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;
