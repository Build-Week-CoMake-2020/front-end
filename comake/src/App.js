import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Navbar, NavbarBrand, NavItem, NavLink, NavbarText, Nav, Button, CardImg, Card} from 'reactstrap'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
//import Login from './components/Login' ;
import SignUp from './components/SignUp';
import AddIssue from './components/actions/AddIssue';
import ProfilePage from './components/ProfilePage';
import IssuesList from './components/IssuesList';
import PrivateRoute from './utils/PrivateRoute';
import { IssueProvider } from './components/context/IssueContext';

import axios from 'axios'

const App = () => {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    axios
      .get('https://amp-node-api.herokuapp.com/api')
      .then(response => {
        console.log(response.data);
        setIssues(response.data)
      })
      .catch(error => console.log("Error!", error))
  }, []);
  return (
    <IssueProvider>
    <Router>
        <Navbar>
            <NavbarBrand><Link to='/'>Neghborli</Link></NavbarBrand>
            <Nav>
                <NavItem>
                    <Link style = {{padding: '10px'}} to='/'>Home</Link>
                    <Link style = {{padding: '10px'}} to='/signup'> SignUp</Link>
                    <Link style = {{padding: '10px'}} to='/login'> Login </Link>
                </NavItem>
            </Nav>
      </Navbar>
      <div style={{backgroundColor:'#e74c3d'}}>
            <Jumbotron fluid style={{backgroundColor:'#303030'}}>
                <Container>
                    <h1 className='display-3' style={{color:'#fff'}}><span style={{fontFamily:'Monoton', color:'#e74c3d'}}></span> NeighborlI</h1>
                </Container>
            </Jumbotron>

       <Route exact path = '/'>  
       <Card>
        {/* <CardImg style = {{width:'100%', margin:'0 auto', height:'800px'}} src={require ('./assets/img3.jpg')}/>  */}
        </Card>
        </Route>   
            </div>

    <Route exact path = '/'>
    </Route>
     
      <Route exact path ='/SignUp'>
        <SignUp/>  
      </Route>  

      <Route exact path = '/AddIssue'>
       <AddIssue/>
       </Route>

       <Route exact path ='/'>
         <IssuesList items= {issues}/>
       </Route>

       {/* <Route exact path = '/ListPage'>
      <ListPage />
      </Route>  */}
      <Switch>
        <PrivateRoute exact path="/ProfilePage" component={ProfilePage} />
        {/* <Route exact path="/login" render={(props) => <Login {...props} />} /> */}
      </Switch>
    </Router>
    </IssueProvider>
  );
}

export default App;
