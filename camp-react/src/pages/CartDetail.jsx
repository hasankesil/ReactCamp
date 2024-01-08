import React, { useState } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/actions/cartActions';
import { toast } from 'react-toastify'
import axios from 'axios';

export default function CartDetail() {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const [addedItemId, setAddedItemId] = useState(null);

    const handleAddToCart = async (todo) => {
        try {
            dispatch(addToCart(todo));
            toast.success(`${todo.userId} sepete eklendi`, {
                autoClose: 1200,
            });

            const response = await axios.post('http://localhost:3000/cartItems', { todo });
            const newAddedItemId = response.data.id;

            setAddedItemId(newAddedItemId);


        } catch (error) {
            console.error('Ürün eklenirken bir hata oluştu:', error);
        }
    };

    const handleRemoveFromCart = async (todo) => {
        try {
            const isItemInCart = cartItems.some((c) => c.todo.id === todo.id);

            if (isItemInCart) {
                dispatch(removeFromCart(todo));
                toast.success(`${todo.userId} sepetten çıkarıldı`, {
                    autoClose: 1200,
                });

                if (addedItemId) {
                    await axios.delete(`http://localhost:3000/cartItems/${addedItemId}`);
                    console.log('Ürün başarıyla silindi:', addedItemId);
                } else {
                    console.error('Ürün ID bulunamadı.');
                }


            }
        } catch (error) {
            console.error('Ürün silinirken bir hata oluştu:', error.response);
        }
    };

    return (
        <div>
            {cartItems.map((cartItem) => (
                <Card fluid >
                    <Image
                        floated='right'
                        size='mini'
                        src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                    />
                    <Card.Content>
                        <Card.Header>{`Name: ${cartItem.todo.title}`}</Card.Header>
                        <Card.Meta style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{`Quantity: ${cartItem.quantity}`}</Card.Meta>

                        <Card.Description>
                            {`Description: ${cartItem.todo.description}`}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green' onClick={() => handleAddToCart(cartItem.todo)}>
                                Arttır
                            </Button>
                            <Button basic color='blue' onClick={() => handleRemoveFromCart(cartItem.todo)}>
                                Azalt
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            ))}
        </div>
    );
}



