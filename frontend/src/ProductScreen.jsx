import axios from "axios";
import Rating from "./components/Rating";
import React, { useEffect, useState } from "react";
import { Card, Col, ListGroup, Row, Image, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios.get(`/api/product/${productId}`).then((res) => {
      setProduct(res.data);
    });
  }, [productId]);

  if (!product) return <div>loading</div>;

  // const product = products.find((p) => (p.id = productId));
  return (
    <>
      <Link to={"/"} className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? "In" : "Out of"} Stock</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
