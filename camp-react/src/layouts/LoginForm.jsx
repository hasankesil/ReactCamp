// LoginForm.jsx
import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = ({ onSignIn, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const relog = async () => {
        await toast.success(' lütfen kayıt olun', {
            position: "top-right",
            autoClose: 2000, // 2 saniye sonra kapat
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            marginTop: "200px",

        });
    }

    const handleSignIn = () => {
        const storedUsersJSON = localStorage.getItem('users');
        const storedUsers = storedUsersJSON ? JSON.parse(storedUsersJSON) : [];

        const userToSignIn = storedUsers.find(user => user.username === username && user.password === password);

        if (userToSignIn) {
            // Kullanıcı bulundu, oturumu aç
            onSignIn(userToSignIn);
            toast.success('Giriş başarılı!', { autoClose: 1500 });
        } else {
            // Kullanıcı bilgileri hatalı
            setError('Kullanıcı adı veya şifre hatalı.');


        }
        onClose();

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
