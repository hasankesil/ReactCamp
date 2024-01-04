import React, { useState } from 'react';
import CartSummery from './CartSummery';
import { Container, Menu } from 'semantic-ui-react';
import SignedOut from './SignedOut';
import SignedIn from './SignedIn';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navi() {
  const { cartItems } = useSelector((state) => state.cart);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true); // Kullanıcı kimliğini doğrula
    } else {
      setIsAuthenticated(false);
    }
  };



  const handleSignOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleRegister = (userData) => {
    // Kayıt olma işlemleri
    console.log('Kayıt başarılı:', userData);

    // Kullanıcı bilgilerini sakla
    localStorage.setItem('user', JSON.stringify(userData));

    // Giriş yapılabilir
    handleSignIn(userData);
  };

  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item name="home" />
          <Menu.Item name="messages" />
          <Menu.Menu position="right">
            {cartItems.length > 0 && <CartSummery />}
            {user ? (
              <SignedIn signOut={handleSignOut} user={user} />
            ) : (
              <SignedOut signIn={handleSignIn} onRegister={handleRegister} />
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}