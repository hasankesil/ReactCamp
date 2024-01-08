// LoginForm.jsx
import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const LoginForm = ({ onSignIn, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const relog = async () => {
        await toast.success('Şimdi Kayıt ol sekmesine gidin!', {

            autoClose: 1700,


        });
    }
    // Frontend tarafında
    const handleSignIn = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/users?username=${username}&password=${password}`);

            // Backend'den başarılı bir cevap alındıysa
            if (response.data.length > 0) {
                onSignIn(response.data[0]);
                setError('');
                toast.success('Giriş başarılı!', { autoClose: 1500 });
            } else {
                // Kullanıcı bulunamadı
                setError('Kullanıcı adı veya şifre hatalı.');
            }
        } catch (error) {
            // Axios isteği sırasında bir hata oluştuysa
            console.error('Axios Hatası:', error);
            setError('Giriş sırasında bir hata oluştu.');
        }
    };



    return (
        <Form error={!!error} style={{ width: '300px' }}>
            <Form.Input
                label="Kullanıcı Adı"
                placeholder="Kullanıcı Adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Input
                label="Şifre"
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button primary onClick={handleSignIn}>
                Giriş Yap
            </Button>
            {error && <Message error content={error} />}
            <Message>
                Hesabınız yok mu ? Hemen kayıt olun! <a onClick={() => { onClose(); navigate('/'); relog() }}>Kayıt ol</a>
            </Message>
        </Form>
    );
};

export default LoginForm;
