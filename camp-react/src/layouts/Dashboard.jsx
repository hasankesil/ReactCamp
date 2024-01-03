import React from 'react'
import Navi from './Navi'
import Categories from './Categories'
import { Grid } from 'semantic-ui-react'
import Todos from '../pages/Todos'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoDetail from '../pages/TodoDetail'
import CartDetail from '../pages/CartDetail'
import { ToastContainer } from 'react-toastify'
import TodoAdd from '../pages/TodoAdd'


export default function Dashboard() {
  return (
    <div>
      <ToastContainer position='bottom-right' />
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Categories></Categories>
          </Grid.Column>
          <Grid.Column width={12}>



            <Routes>
              <Route exact path='/' Component={Todos} />
              <Route exact path='/todo' Component={Todos} />
              <Route exact path='/todo/:title' Component={TodoDetail} />
              <Route exact path='/cart' Component={CartDetail} />
              <Route path='/todo/add' Component={TodoAdd} />



            </Routes>



          </Grid.Column>
        </Grid.Row>
      </Grid>


    </div>
  )
}
