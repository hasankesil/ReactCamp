// CartSummery.jsx

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dropdown, DropdownDivider, DropdownItem, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, setCartItems } from '../store/actions/cartActions';
import { toast } from 'react-toastify';
import axios from 'axios';


export default function CartSummery() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [addedItemId, setAddedItemId] = useState(null);

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan sepet verilerini oku
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Redux store'a set et
    dispatch(setCartItems(savedCartItems));
  }, [dispatch]);

  const handleAddToCart = async (todo) => {
    try {
      dispatch(addToCart(todo));
      toast.success(`${todo.userId} sepete eklendi`, {
        autoClose: 1200,
      });

      const response = await axios.post('http://localhost:3000/cartItems', { todo });
      const newAddedItemId = response.data.id;

      setAddedItemId(newAddedItemId);


    } catch (error) {
      console.error('Ürün eklenirken bir hata oluştu:', error);
    }
  };

  const handleRemoveFromCart = async (todo) => {
    try {
      const isItemInCart = cartItems.some((c) => c.todo.id === todo.id);

      if (isItemInCart) {
        dispatch(removeFromCart(todo));
        toast.success(`${todo.userId} sepetten çıkarıldı`, {
          autoClose: 1200,
        });

        if (addedItemId) {
          await axios.delete(`http://localhost:3000/cartItems/${addedItemId}`);
          console.log('Ürün başarıyla silindi:', addedItemId);
        } else {
          console.error('Ürün ID bulunamadı.');
        }


      }
    } catch (error) {
      console.error('Ürün silinirken bir hata oluştu:', error.response);
    }
  };

  return (
    <div>
      <Dropdown item text='Sepetiniz'>
        <Dropdown.Menu onClick={(e) => e.stopPropagation()}>
          {cartItems.map((cartItem) => (
            <Dropdown.Item key={cartItem.todo.userId}>
              {cartItem.todo.userId} numaralı kullanıcı {'(ürün)'}: {'  '}
              <Label>{cartItem.quantity}</Label>

              <span style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
                <Label as='a' onClick={(e) => handleAddToCart(cartItem.todo, e)} color='green' tag>
                  Arttır
                </Label>
                <Label as='a' onClick={(e) => handleRemoveFromCart(cartItem.todo, e)} color='red' tag style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>
                  <div style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>
                    Azalt
                  </div>
                </Label>
              </span>
            </Dropdown.Item>
          ))}
          <DropdownItem as={NavLink} to='/cart'>
            Sepete Git
          </DropdownItem>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
