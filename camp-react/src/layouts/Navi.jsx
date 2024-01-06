// Navi.jsx
import React, { useState } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import CartSummery from './CartSummery';
import SignedOut from './SignedOut';
import SignedIn from './SignedIn';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Navi() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleSignIn = (user) => {
    setUser(user);
  };


  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
    toast.success('Çıkış yapıldı!', {
      autoClose: 1200
    });
  };

  return (
    <div>

      <Menu inverted fixed="top">
        <Container>
          <Menu.Item name="home" />
          <Menu.Item name="messages" />
          <Menu.Menu position="right">
            {user ? (
              <SignedIn signOut={handleSignOut} user={user} />
            ) : (
              <SignedOut signIn={handleSignIn} />
            )}
            <CartSummery />
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
