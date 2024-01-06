import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Dropdown, DropdownDivider, DropdownItem, Label } from 'semantic-ui-react'

export default function CartSummery() {

  const { cartItems } = useSelector(state => state.cart)
  return (
    <div>
      <Dropdown item text='Sepetiniz'>
        <Dropdown.Menu>
          {
            cartItems.map((cartItem) => (

              <Dropdown.Item>   {cartItem.todo.userId} numaralı kullanıcı {'(ürün)'}: {'  '}
                <Label>
                  {cartItem.quantity}
                </Label>

              </Dropdown.Item>
            ))
          }
          <DropdownDivider />
          <DropdownItem as={NavLink} to="/cart" >Sepete Git</DropdownItem>
        </Dropdown.Menu>
      </Dropdown>
    </div >
  )
}
