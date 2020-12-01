import React , {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import {AuthProvider} from './context/auth'
import AuthRoute from './util/AuthRoute'

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';

import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/GlobalStyle";
import { lightTheme, darkTheme } from "./components/Themes"


function App() {

  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <>
      <GlobalStyles/>
    <AuthProvider>
        <Router>
      <Container>
      <MenuBar/>
      <button onClick={themeToggler}>Switch Theme</button>
       <Route exact path='/' component={Home}/>
       <AuthRoute exact path="/login" component={Login}/>
       <AuthRoute exact path="/register" component={Register}/>
       <Route exact path="/posts/:postId" component={SinglePost}/>
       
      </Container>
     </Router>
   
    </AuthProvider>
     </>
       </ThemeProvider>
  );
}

export default App;
