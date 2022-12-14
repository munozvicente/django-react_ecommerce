import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { listProductDetails } from "../actions/productActions";
import { updateProduct }   from "../actions/productActions";

import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen() {

  const productId = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
        dispatch({type: PRODUCT_UPDATE_RESET})
        navigate("/admin/productlist")
    } else {
        if (!product.name || product._id !== Number(productId.id)) {
            dispatch(listProductDetails(productId.id));
        } else {
            setName(product.name)
            setImage(product.image)
            setPrice(product.price)
            setBrand(product.brand)
            setCountInStock(product.countInStock)
            setCategory(product.category)
            setDescription(product.description)
        }
    }
  }, [product, productId, dispatch, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ _id: product._id, name, image, price, brand, category, countInStock, description }))
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('image', file);
    formData.append('product_id', productId.id);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }

      const { data } = await axios.post(`/api/products/upload/`, formData, config);

      setImage(data);
      setUploading(false);

    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div>
      <Link to={"/admin/productlist/"}> Go Back </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Product Image</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter an image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.Control 
                type="file"
                id="image-file"
                label="Choose file"
                custom
                onChange={uploadFileHandler}
                >
              </Form.Control>
              {uploading && <Loader />}

            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Product Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Product Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Product Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Product description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
