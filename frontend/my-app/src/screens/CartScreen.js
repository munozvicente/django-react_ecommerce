import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { Message } from "../components/Message";

import { addToCart } from "../actions/cartActions";


function CartScreen() {

  const match = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const productId = match.id;
  const location = useLocation()
  const qty = Number(searchParams.get('qty'))

  
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  console.log('cartItems: ', cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty])

  return (
    <div>
        Cart
    </div>
  )
}

export default CartScreen;