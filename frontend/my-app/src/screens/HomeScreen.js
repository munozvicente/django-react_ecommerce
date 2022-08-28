import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'; // useSelector lets us select certain parts of our state or our redux
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';


function HomeScreen() {
    const dispatch = useDispatch()
    const productsReducer = useSelector(state => state.productList)
    const { products, loading, error } = productsReducer

    useEffect(() => {
        dispatch(listProducts())

    }, [dispatch])

  return (
    <div>
        <h1>Latest Products</h1>
        {loading ? <Loader/>
          : error ? <Message variant="danger">{error}</Message> // indica que el color será rojo
            :
            <Row>
              {products.map(product => (
                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
        }
    </div>
  )
}

export default HomeScreen