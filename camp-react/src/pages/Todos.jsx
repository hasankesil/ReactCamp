import React, { useState, useEffect } from 'react';
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react';
import TodoService from '../services/TodoServices';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, clearCartAction } from '../store/actions/cartActions';
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
