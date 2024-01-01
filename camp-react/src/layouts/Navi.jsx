import React, { useState } from 'react'
import CartSummery from './CartSummery'
import { Container, Menu } from 'semantic-ui-react'
import SignedOut from './SignedOut'
import SignedIn from './SignedIn'
import { useNavigate } from 'react-router-dom'



export default function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const navigate = useNavigate()

  function handleSingOut() {
    setIsAuthenticated(false)
    navigate("/")

  }

  function handleSingIn() {
    setIsAuthenticated(true)
  }
  return (
    <div>
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item
            name='home'

          />
          <Menu.Item
            name='messages'

          />

          <Menu.Menu position='right'>

            <CartSummery />
            {isAuthenticated ? <SignedIn signOut={handleSingOut} /> : <SignedOut
              signIn={handleSingIn} />}




          </Menu.Menu>
        </Container>


      </Menu>
    </div>
  )
}
