import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

const LoginForm = ({ onSignIn, setUser, setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');

    const handleSignIn = () => {
       
        const registrationOccurred = localStorage.getItem('registrationOccurred');

        if (registrationOccurred === 'true' && email && password) {
            
            const storedUsers = JSON.parse(localStorage.getItem('users'));

           
            const userToSignIn = storedUsers.find(user => user.email === email && user.password === password);

            if (userToSignIn) {
              
                localStorage.setItem('user', JSON.stringify(userToSignIn));

          
                localStorage.removeItem('registrationOccurred');

                setUser(userToSignIn);
                setIsAuthenticated(true); 
                setError('');
                onSignIn(userToSignIn);
            } else {
                setError('Kullanıcı adı veya şifre yanlış.');
            }
        } else {
         
            localStorage.removeItem('registrationOccurred');
        }
    };




    return (
        <div>
            <h2>Giriş Yap</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Form>
                <Form.Field>
                    <label>Kullanıcı Adı:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Şifre:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Field>
                <Button primary onClick={handleSignIn}>
                    Giriş Yap
                </Button>
            </Form>
        </div>
    );
};

export default LoginForm;
