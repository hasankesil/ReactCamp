// RegisterForm.jsx
import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


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

    const handleRegister = async () => {
        try {
            if (username && password) {
                // Kontrol: Aynı kullanıcı adıyla zaten kayıtlı bir kullanıcı var mı?
                const existingUserResponse = await axios.get(`http://localhost:3000/users?username=${username}`);

                if (existingUserResponse.data.length > 0) {
                    setError('Bu kullanıcı adı zaten kullanılmaktadır.');
                    return;
                }

                // Kayıt işlemi
                const response = await axios.post('http://localhost:3000/users', {
                    username,
                    password,
                });

                onRegister(response.data);
                toast.success('Kayıt başarıyla tamamlandı!', { autoClose: 1700 });
                closeModal();
            } else {
                setError('Kullanıcı adı ve şifre zorunludur.');
            }
        } catch (error) {
            setError('Kayıt sırasında bir hata oluştu.');
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
