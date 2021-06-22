import { createContext } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext'
import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/home";
import { useState, useEffect } from 'react';
import {auth, firebase} from "./services/firebase"




function App() {
  
  
  return (
   <BrowserRouter>
<AuthContextProvider>
   <Route path="/" exact component={Home} />
   <Route path="/rooms/new" component={NewRoom} />
  </AuthContextProvider>
   </BrowserRouter>
  );
}

export default App;
