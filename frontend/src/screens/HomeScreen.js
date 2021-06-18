import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
// import products from '../products';
import Product from '../components/Product'

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const getProducts = async()=>{
      const {data} = await axios.get('/products');
      console.log(data);
      setProducts(data);
    }
    getProducts();
  }, [])
    return (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}    
          </Row>  
        </>
    )
}

export default HomeScreen
