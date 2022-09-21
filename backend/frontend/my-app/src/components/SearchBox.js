import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let navigate = useNavigate();
  let location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate(navigate(location.pathname));
    }
  };

  return (
    <div>
      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
        <Button type="submit" variant="online-success" className="p-2">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SearchBox;
