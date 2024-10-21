 
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
 
function App() {
 

  return (
   <BrowserRouter>
   <Navbar/>
     <Routes>
      <Route  path='/' element={<Home/>} />
      <Route path='/rent' element={<Renting/>} />
    </Routes>

    <Footer/>
   </BrowserRouter>
  )
}
export default App
