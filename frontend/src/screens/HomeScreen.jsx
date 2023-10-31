import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slice/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {
            // @ts-ignore
            error?.data?.messsage
          }
        </Message>
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
