import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import  Rating  from '../components/Rating';
import { productDetailsList } from '../actions/productAction';
import Message from '../components/Message';
import Loader from '../components/Loader';


const ProductScreen = ({ match, history }) => {
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productDetails);
    const { loading, error, product } = productList

    useEffect(()=>{
        dispatch(productDetailsList(match.params.id));
       
      }, [dispatch, match]);

    let addToCart = () => {
        history.push(`/cart/${match.params.id}?quantity=${quantity}`)
    }
    

    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            { loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>: (
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item className="details">
                            Details: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                
                </Col>
                <Col md={3}>
                    <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Price:
                                </Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Status:
                                </Col>
                                <Col>
                                    {product.countInStock > 0? "In Stock": "out of stock"}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        {product.countInStock !== 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Quantity</Col>
                                    <Col>
                                        <Form.Control as='select' value={quantity} onChange={(e)=> setQuantity(e.target.value)} >
                                            {[...Array(product.countInStock).keys()].map(item => (
                                                <option value={item + 1} key={item + 1}>
                                                    {item + 1}
                                                </option>)
                                            )}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                            <Button className="btn-block" type="button" disabled={product.countInStock === 0} onClick={addToCart}>
                                Add to cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                    </Card>
                </Col>
            </Row>
            )}
        </>
    )
}

export default ProductScreen;
