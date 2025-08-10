import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Metrics from './pages/Metrics';
import Insights from './pages/Insights';
import { AppBar, Toolbar, Button, Container } from '@mui/material';

function App(){
  return(
    <Router>
      <AppBar position = "static">
        <Toolbar>
          <Button color='inherit' component={Link} to='/'>Dashboard</Button>
          <Button color='inherit' component = {Link} to= '/metrics'>Metrics</Button>
          <Button color='inherit' component = {Link} to = '/insights'>Insights</Button>
        </Toolbar>
      </AppBar>
      <Container sx = {{mt:4}}>
        <Routes>
          <Route path='/' element = {<Dashboard /> }/>
          <Route path='/metrics' element = {<Metrics /> }/>
          <Route path = '/insights' element = {<Insights />}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;