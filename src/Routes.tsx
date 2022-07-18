import Navbar from 'component/Navbar';
import Auth from 'page/Auth';
import Home from 'page/Home';
import Lista from 'page/Lista';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/movies/1" exact>
        <Lista />
      </Route>      
      <Redirect from="/auth" to="/auth/login" exact />
      <Route path="/auth">
        <Auth />
      </Route>      
    </Switch>
  </BrowserRouter>
);

export default Routes;