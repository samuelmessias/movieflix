import Navbar from 'component/Navbar';
import Auth from 'page/Auth';
import Home from 'page/Home';
import Lista from 'page/Lista';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from 'util/history';


const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>    
      <Route path="/movies" exact>
        <Home />
      </Route>
      <Route path="/movies/:movieId" exact>
        <Lista />
      </Route>            
      <Route path="/">
        <Auth />
      </Route>      
    </Switch>
  </Router>
);

export default Routes;