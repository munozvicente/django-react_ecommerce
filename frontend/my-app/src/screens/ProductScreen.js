import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import axios from 'axios';

import Rating from '../components/Rating'
import products from '../products'

function ProductScreen() {
    const match = useParams();

    const [product, setProduct] = useState([])

    useEffect(() => {

        async function fetchProduct() {

            const { data } = await axios.get(`/api/products/${match.id}`)
            setProduct(data)
        }

        fetchProduct();

    })

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>

                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
        </div>
    )
}

export default ProductScreen