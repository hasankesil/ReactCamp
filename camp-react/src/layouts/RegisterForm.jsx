// RegisterForm.jsx
import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegisterForm = ({ onRegister, onSignIn, closeModal }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const relog = async () => {
        await toast.success(' lütfen mevcut hesabınızla giriş yapınız', {
            position: "top-right",
            autoClose: 2000, // 2 saniye sonra kapat
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            marginTop: "200px",

        });
    }

    const handleRegister = () => {
        if (username && password) {
            const storedUsersJSON = localStorage.getItem('users');
            const storedUsers = storedUsersJSON ? JSON.parse(storedUsersJSON) : [];

            const existingUser = storedUsers.find(user => user.username === username);

            if (existingUser) {
                setError('Bu kullanıcı adı zaten kullanılmaktadır.');
            } else {
                const userData = {
                    username,
                    password,
                };

                storedUsers.push(userData);

                localStorage.setItem('users', JSON.stringify(storedUsers));
                onRegister(userData);
                toast.success('Kayıt başarıyla tamamlandı!');
                closeModal();
            }
        } else {
            setError('Kullanıcı adı ve şifre zorunludur.');
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
            <Button primary onClick={handleRegister}>
                Kayıt Ol
            </Button>
            {error && <Message error content={error} />}
            <Message>
                Zaten bir hesabınız var mı? <a onClick={() => { closeModal(); navigate('/'); relog() }}>Giriş Yap</a>
            </Message>
        </Form>
    );
};

export default RegisterForm;
