import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Product from "./Product";
import { useGetProductsQuery } from "../slice/productApiSlice";

const HomeScreen = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>{error?.data?.messsage}</div>
      ) : (
        <div>
          Lastest Products
          <Container>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
