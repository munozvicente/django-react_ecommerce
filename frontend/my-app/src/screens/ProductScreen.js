import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, createSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';

import Rating from '../components/Rating'

function ProductScreen({match, history}) {

    const productId = useParams() // former way: match.params.id (now deprecated) 
    const [qty, setQty] = useState(1)
 
    const navigate = useNavigate() // This is the former history prop, and former useHistory()
    const params = {qty:qty} // Here we set the query param 'qty' to the value qty    

    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(productId.id))
    }, [dispatch, productId])

    const addToCartHandler = () => {      
    //Now we set the navigate hook:        
        navigate({            
           pathname: `/cart/${productId.id}`,            
           search: `?${createSearchParams(params)}`,          
       });        
    } 

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
                { loading ? <Loader/> 
                    : error ? <Message variant="danger">{error}</Message>
                        :
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

                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    
                                {/* If the product is in stock, then it can be added to the cart */}
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Quantity:</Col>
                                                <Col xs="auto" className="my-1">
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x+1} value={x+1}>
                                                                    {x + 1}
                                                                </option>
                                                            ) )
                                                        }   
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button 
                                        className="btn-block" 
                                        type="button"
                                        disabled={product.countInStock === 0}
                                        onClick={addToCartHandler}
                                        >Add to Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                }
        </div>
    )
}

export default ProductScreen