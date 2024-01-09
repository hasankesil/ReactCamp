// Navi.jsx
import React, { useState } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';  // Importing useSelector from react-redux
import CartSummery from './CartSummery';
import SignedOut from './SignedOut';
import SignedIn from './SignedIn';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from '../store/actions/userActions';

export default function Navi() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = (user) => {

    dispatch(setUser(user));
  };

  const handleSignOut = () => {

    dispatch(setUser(null));

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
