import React from 'react'
import CartSummery from './CartSummery'
import { Container, Button, Menu } from 'semantic-ui-react'


export default function Navi() {
  return (
    <div>
      <Menu inverted fixed>
        <Container>
          <Menu.Item
            name='home'

          />
          <Menu.Item
            name='messages'

          />

          <Menu.Menu position='right'>
            <CartSummery />

            <Menu.Item>
              <Button primary>Sign Up</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>


      </Menu>
    </div>
  )
}