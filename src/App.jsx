 
 import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Container,
} from '@chakra-ui/react'
import React from 'react'
import Home from './pages/Home'
import Footer from "./pages/Footer"

import {BrowserRouter, Route, Routes} from "react-router-dom"
import Renting from './pages/Renting'
import Navbar from './pages/Navbar'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import PaymentPage from './pages/PaymentPage'
import AuthPage from './pages/AuthPage'
import Test from './pages/Test'
 
function App() {
 

  return (
   <BrowserRouter>
   <Navbar/>
     <Routes>
     <Route path="/login" element={<AuthPage isLogin={true} />} />
     <Route path="/signup" element={<AuthPage isLogin={false} />} />
      <Route  path='/' element={<Home/>} />
      <Route path='/rent' element={<Renting/>} />
      <Route path="/payment" element={<Renting />} />
      <Route path='/success'  element={<Success/>} />
      <Route path='/cancel' element={<Test/>} />
    </Routes>

    <Footer/>
   </BrowserRouter>
  )
}
export default App
