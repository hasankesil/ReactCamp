import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

const RegisterForm = ({ onRegister, onSignIn }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
     
        if (firstName && lastName && email && password) {
      
            const storedUsers = JSON.parse(localStorage.getItem('users'));

        
            const existingUser = storedUsers.find(user => user.firstName == firstName);

            if (existingUser) {
                setError('Bu kullanıcı adı zaten kullanılmaktadır.');
            } else {
              
                const userData = {
                    firstName,
                    lastName,
                    email,
                    password,
                };

                storedUsers.push(userData);

                localStorage.setItem('users', JSON.stringify(storedUsers));

              
                onRegister(userData);
            }
        } else {
            setError('Lütfen tüm alanları doldurun.');
        }
    };

    return (
        <Form error={!!error} style={{ width: '300px' }}>
            <Form.Input
                label="First Name"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Input
                label="Last Name"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <Form.Input
                label="Email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button primary onClick={handleRegister}>
                Register
            </Button>
            {error && <Message error content={error} />}
            <Message>
                Already have an account? <a onClick={onSignIn}>Sign In</a>
            </Message>
        </Form>
    );
};

export default RegisterForm;