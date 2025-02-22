import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginScreen from './pages/LoginScreen'
import RegisterScreen from './pages/RegisterScreen'
import Wrapper from './components/Elements/Wrapper'
<<<<<<< HEAD
import { useDispatch } from 'react-redux'
=======
import { useDispatch, useSelector } from 'react-redux'
>>>>>>> main
import { setUpSocket } from './redux/actions/socket.action'


const App = () => {
  const dispatch = useDispatch()
<<<<<<< HEAD
  dispatch(setUpSocket());
=======
  const { user } = useSelector(state => state.UserData)
  if(user?.user){ dispatch(setUpSocket())};
>>>>>>> main
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={ <Wrapper> <Home/> </Wrapper>} exact />
          <Route path='/users/login' element={ <Wrapper> < LoginScreen />  </Wrapper> }  />
          <Route path='/users/register' element={ <Wrapper> <RegisterScreen /> </Wrapper>  }  />
        </Routes>
      </Router>
    </>
  )
}

export default App
