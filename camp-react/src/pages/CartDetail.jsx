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
    const user = useSelector((state) => state.user.user);

    const handleAddToCart = async (todo) => {
        try {
            if (!user) {
                console.error('Kullanıcı bilgileri bulunamadı.');
                return;
            }

            const currentUserResponse = await axios.get(`http://localhost:3000/users/${user.id}`);

            if (currentUserResponse.data.length === 0) {
                console.error('Kullanıcı bulunamadı.');
                return;
            }

            const currentCart = currentUserResponse.data.cart;

            // Yeni ürünü sepete ekle
            if (todo) {
                dispatch(addToCart(todo)); // Redux ile sepete ekleme
                const updatedCart = [...currentCart, { todo }];
                console.log('Güncellenmiş Sepet:', updatedCart);

                // Axios ile kullanıcının sepetini güncelle
                await axios.patch(`http://localhost:3000/users/${user.id}`, { cart: updatedCart });

                // Eklenen ürünün ID'sini al
                const addedItemId = todo.id; // ya da response.data gibi bir değer alınabilir
                console.log('Eklenen Ürün ID:', addedItemId);

                setAddedItemId(addedItemId);

                toast.success(`${user.username}, sepete eklendi`, {
                    autoClose: 1200,
                });
            } else {
                console.error('Ürün bilgileri eksik veya hatalı.');
            }
        } catch (error) {
            console.error('Ürün eklenirken bir hata oluştu:', error);
            console.error('Hata Detayları:', error.response);
        }
    };






    const handleRemoveFromCart = async (todo) => {
        try {
            if (!user) {
                console.error('Kullanıcı bilgileri bulunamadı.');
                return;
            }


            // Axios ile kullanıcının güncel sepet bilgilerini al
            const currentUserResponse = await axios.get(`http://localhost:3000/users/${user.id}`);

            if (currentUserResponse.data.length === 0) {
                console.error('Kullanıcı bulunamadı.');
                return;
            }

            const currentCart = currentUserResponse.data.cart;

            if (todo) {
                // Redux ile sepetten çıkarma
                dispatch(removeFromCart(todo));
                toast.success(`${todo.userId} sepetten çıkarıldı`, {
                    autoClose: 1200,
                });

                // Axios ile kullanıcının sepetinden ürünü kaldır
                await axios.patch(`http://localhost:3000/users/${user.id}`, {
                    cart: currentCart.filter(cartItem => cartItem.todo.id !== todo.id)
                });

                console.log('Ürün başarıyla sepetten çıkarıldı:', todo.id);
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



