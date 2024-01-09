import React, { useState, useEffect } from 'react';
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react';
import TodoService from '../services/TodoServices';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/actions/cartActions';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Todos() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [todos, setTodos] = useState([]);
    const [addedItemId, setAddedItemId] = useState(null);

    useEffect(() => {
        const todoService = new TodoService();
        todoService.getTodos().then((result) => setTodos(result.data));
    });
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
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Kullanıcı ID</Table.HeaderCell>
                        <Table.HeaderCell>Görev</Table.HeaderCell>
                        <Table.HeaderCell>Tamamlanma</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {todos.map((todo) => (
                        <Table.Row key={todo.id}>
                            <Table.Cell>
                                {' '}
                                <Link to={`todo/${todo.title}`}>{todo.userId}</Link>{' '}
                            </Table.Cell>
                            <Table.Cell>{todo.title}</Table.Cell>
                            <Table.Cell>{todo.completed ? 'evet' : 'hayır'}</Table.Cell>
                            <Table.Cell>
                                {' '}
                                <Button onClick={() => handleAddToCart(todo)}> Sepete Ekle</Button>{' '}
                            </Table.Cell>
                            <Table.Cell>
                                {' '}
                                <Button onClick={() => handleRemoveFromCart(todo)}> Sepetten Çıkar</Button>{' '}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    );
}
