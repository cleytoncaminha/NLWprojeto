import { createContext } from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext'
import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/home";
import { useState, useEffect } from 'react';
import {auth, firebase} from "./services/firebase"
import { Room } from './pages/Room';




function App() {
  
  
  return (
   <BrowserRouter>
<AuthContextProvider>
  <Switch>
   <Route path="/" exact component={Home} />
   <Route path="/rooms/new" component={NewRoom} />
   <Route path="/rooms/:id" component={Room} />
  </Switch>
  </AuthContextProvider>
   </BrowserRouter>
  );
}

export default App;
