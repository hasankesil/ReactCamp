import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

const LoginForm = ({ onSignIn, setUser, setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');

    const handleSignIn = () => {
        // Kayıt gerçekleşip gerçekleşmediğini kontrol etmek için bayrağı kontrol et
        const registrationOccurred = localStorage.getItem('registrationOccurred');

        if (registrationOccurred === 'true' && email && password) {
            // Yalnızca kayıt gerçekleştiyse otomatik giriş yapmaya çalış
            const storedUsers = JSON.parse(localStorage.getItem('users'));

            // Kullanıcı adı ve şifreye göre kullanıcıyı kontrol et
            const userToSignIn = storedUsers.find(user => user.email === email && user.password === password);

            if (userToSignIn) {
                // Kullanıcıyı giriş yapmış olarak işaretle
                localStorage.setItem('user', JSON.stringify(userToSignIn));

                // Giriş yaptıktan sonra registrationOccurred bayrağını sıfırla
                localStorage.removeItem('registrationOccurred');

                setUser(userToSignIn);
                setIsAuthenticated(true); // Kullanıcı kimliğini doğrula
                setError(''); // Hata durumunu temizle
                onSignIn(userToSignIn);
            } else {
                setError('Kullanıcı adı veya şifre yanlış.');
            }
        } else {
            // Kayıt gerçekleşmediyse bayrağı sıfırla
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
