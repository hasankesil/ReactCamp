import React, { useState, useEffect } from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import TodoService from '../services/TodoServices'




export default function Todos() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        let todoService = new TodoService();
        todoService.getTodos().then(result => setTodos(result.data))


    })

    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Kullanıcı ID</Table.HeaderCell>
                        <Table.HeaderCell>Görev</Table.HeaderCell>
                        <Table.HeaderCell>Tamamlanma</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        todos.map(todo => (
                            <Table.Row>
                                <Table.Cell>{todo.userId}</Table.Cell>
                                <Table.Cell>{todo.title}</Table.Cell>
                                <Table.Cell>{todo.completed ? 'evet' : 'hayır'}</Table.Cell>
                            </Table.Row>

                        ))
                    }



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
    )
}
