import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Navbar, NavbarBrand, NavItem, NavLink, NavbarText, Nav, Button, CardImg, Card} from 'reactstrap'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from './components/Login' ;
import SignUp from './components/SignUp';
import AddIssue from './components/actions/AddIssue';
import ProfilePage from './components/ProfilePage';
import IssuesList from './components/IssuesList';
import PrivateRoute from './utils/PrivateRoute';
import { IssueProvider } from './components/context/IssueContext';
import axios from 'axios'
import IssueList from './components/IssueList'


const App = () => {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    axios
      .get('/posts/')
      .then(response => {
        console.log('get', response.data);
        setIssues(response.data)
      })
      .catch(error => console.log("Error!", error))
  }, []);
  return (
    <IssueProvider>
    <Router>
        
      <div style={{backgroundColor:'#e74c3d'}}>
            <Jumbotron fluid style={{backgroundColor:'#F56A6A'}}>
           
                <Container>
                    <h1 className='display-3' style={{color:'#fff'}}><span style={{fontFamily:'Monoton', color:'#e74c3d'}}></span> Neighborli</h1>
                {/* <button type="button" style = {{ marginLeft: '20px', marginRight:'20px'}}class="btn btn-fb"><i class="fab fa-facebook-f pr-1"></i> Facebook</button> */}
                    {/* <button type="button" class="btn btn-tw"><i class="fab fa-twitter pr-1"></i> Twitter</button> */}
                    <Navbar class="navbar-toggler">
            {/* <NavbarBrand><Link to='/'>Neghborli</Link></NavbarBrand> */}
            <Nav>
                
                    <Link style = {{padding: '30px', color: 'black', marginLeft:'300px' }} to='/'>
                      <button>Home</button></Link>
                    <Link style = {{padding: '30px', color: 'black'}} to='/signup'> 
                    <button>SignUp</button></Link>
                    <Link style = {{padding: '30px', color: 'black'}} to='/login'> 
                    <button>Login </button></Link>
               
            </Nav>
      </Navbar>
                    
                    
                </Container>
            </Jumbotron>

       <Route exact path = '/'>  
       <Card>
        <CardImg style = {{width:'100%', margin:'0 auto', height:'800px'}} src={require ('./assets/neighborhood.jpeg')}/> 
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
        <Route exact path="/login" render={(props) => <Login {...props} />} />
      </Switch>
    </Router>
    </IssueProvider>
  );
}

export default App;
