import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import Header from './components/Header';
import { routers } from './routers/index';
import Info from './pages/Info';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Footer from './components/Footer';
function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          {routers.map(route => {
            return <Route path={route.path} key={route.path} component={route.component} exact={route.exact} />
          })}
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
