import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row,Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

function Cart({ match, location, history }) {
    const Id = match.params.id;
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(()=>{
        if(Id){
            dispatch(addToCart(Id, quantity))
        }
    }, [dispatch, quantity, Id]);

    const removeFromCartHandler = (id) =>{
       dispatch(removeFromCart(id)); 
    }
    const checkOut = () =>{
        history.push('/login?redirect=shipping')
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                { cartItems.length === 0 ? <Message>Your cart is empty, <Link to='/'>Go Back</Link> </Message> : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item =>(
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col>
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                    <Form.Control as='select' value={item.quantity} onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))} >
                                            {[...Array(item.countInStock).keys()].map(item => (
                                                <option value={item + 1} key={item + 1}>
                                                    {item + 1}
                                                </option>)
                                            )}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={()=> removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>total ({cartItems.reduce((accumulator, current)=> accumulator + current.quantity, 0)}) items</h2>
                            ${cartItems.reduce((accumulator, current) => accumulator + (current.quantity * current.price), 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkOut}>Proceed to checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default Cart;
