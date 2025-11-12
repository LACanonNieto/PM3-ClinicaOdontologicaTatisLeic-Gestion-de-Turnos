import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './views/Home/Home'
import MyAppointments from './views/MyAppointments/MyAppointments'
import Register from './views/Register/Register'
import Login from './views/Login/Login'
import Contact from './views/Contact/Contact'
import Services from './views/ServicesOdo/Services'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <UserProvider>
      <Navbar/>
      <div> 
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/home' element= {<Home/>}/>
          <Route path='/myAppointments' element= {<MyAppointments/>}/>
          <Route path='/register' element= {<Register/>}/>
          <Route path='/login' element= {<Login/>}/>
          <Route path='/contact' element= {<Contact/>}/>
          <Route path='/services' element= {<Services/>}/>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </UserProvider>
  )
}

export default App
