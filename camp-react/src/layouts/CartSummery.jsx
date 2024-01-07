// CartSummery.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dropdown, DropdownDivider, DropdownItem, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../store/actions/cartActions';
import { toast } from 'react-toastify';



export default function CartSummery() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (todo) => {
    dispatch(addToCart(todo));
    toast.success(`${todo.userId} sepete eklendi`, {
      autoClose: 1200,
    });
  };

  const handleRemoveFromCart = (todo) => {
    dispatch(removeFromCart(todo));
    toast.success(`${todo.userId} sepetten çıkarıldı`, {
      autoClose: 1200,
    });
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
        </Dropdown.Menu>

      </Dropdown>
    </div>
  );
}
