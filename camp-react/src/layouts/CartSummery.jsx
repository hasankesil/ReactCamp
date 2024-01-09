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
  const user = useSelector((state) => state.user.user);



  const handleAddToCart = async (todo) => {
    try {
      if (!user) {
        console.error('Kullanıcı bilgileri bulunamadı.');
        return;
      }

      const currentUserResponse = await axios.get(`http://localhost:3000/users/${user.id}`);

      if (currentUserResponse.data.length === 0) {
        console.error('Kullanıcı bulunamadı.');
        return;
      }

      const currentCart = currentUserResponse.data.cart;

      // Yeni ürünü sepete ekle
      if (todo) {
        dispatch(addToCart(todo)); // Redux ile sepete ekleme
        const updatedCart = [...currentCart, { todo }];
        console.log('Güncellenmiş Sepet:', updatedCart);

        // Axios ile kullanıcının sepetini güncelle
        await axios.patch(`http://localhost:3000/users/${user.id}`, { cart: updatedCart });

        // Eklenen ürünün ID'sini al
        const addedItemId = todo.id; // ya da response.data gibi bir değer alınabilir
        console.log('Eklenen Ürün ID:', addedItemId);

        setAddedItemId(addedItemId);

        toast.success(`${user.username}, sepete eklendi`, {
          autoClose: 1200,
        });
      } else {
        console.error('Ürün bilgileri eksik veya hatalı.');
      }
    } catch (error) {
      console.error('Ürün eklenirken bir hata oluştu:', error);
      console.error('Hata Detayları:', error.response);
    }
  };






  const handleRemoveFromCart = async (todo) => {
    try {
      if (!user) {
        console.error('Kullanıcı bilgileri bulunamadı.');
        return;
      }

      // Axios ile kullanıcının güncel sepet bilgilerini al
      const currentUserResponse = await axios.get(`http://localhost:3000/users/${user.id}`);

      if (currentUserResponse.data.length === 0) {
        console.error('Kullanıcı bulunamadı.');
        return;
      }

      const currentCart = currentUserResponse.data.cart;

      if (todo) {
        // Redux ile sepetten çıkarma
        dispatch(removeFromCart(todo));
        toast.success(`${todo.userId} sepetten çıkarıldı`, {
          autoClose: 1200,
        });

        // Axios ile kullanıcının sepetinden ürünü kaldır
        await axios.patch(`http://localhost:3000/users/${user.id}`, {
          cart: currentCart.filter(cartItem => cartItem.todo.id !== todo.id)
        });

        console.log('Ürün başarıyla sepetten çıkarıldı:', todo.id);
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
            <Dropdown.Item key={cartItem.todo.id}>
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
