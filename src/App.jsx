 
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
import Navbar from './pages/Navbar'

function App() {
 

  return (
   <BrowserRouter>
     <Routes>
      <Route  path='/' element={<Home/>} />
    </Routes>

    <Footer/>
   </BrowserRouter>
  )
}
export default App
