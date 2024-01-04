import React, { useState } from 'react';
import { Button, Menu, Modal } from 'semantic-ui-react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export default function SignedOut({ signIn, onRegister }) {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    return (
        <div>
            <Menu.Item>
                <Button onClick={openLoginModal} primary>
                    Giriş Yap
                </Button>
                <Button primary style={{ marginLeft: '0.5em' }} onClick={openRegisterModal}>
                    Kayıt Ol
                </Button>
                {/* Giriş formunu modal olarak göster */}
                <Modal open={isLoginModalOpen} onClose={closeLoginModal} size="tiny">
                    <Modal.Header>Giriş Yap</Modal.Header>
                    <Modal.Content>
                        <LoginForm onSignIn={signIn} />
                    </Modal.Content>
                </Modal>
                {/* Kayıt formunu modal olarak göster */}
                <Modal open={isRegisterModalOpen} onClose={closeRegisterModal} size="tiny">
                    <Modal.Header>Kayıt Ol</Modal.Header>
                    <Modal.Content>
                        <RegisterForm onRegister={onRegister} onSignIn={() => { signIn(); closeRegisterModal(); }} />
                    </Modal.Content>
                </Modal>
            </Menu.Item>
        </div>
    );
}