import './App.css';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Login from './login';
import Home from './home';
import CreateStore from './create';
import StoreContent from './store'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route exact path="/login" component={Login} />
          <StoreContent>
            <Route exact path="/home" component={Home} />
            <Route exact path="/create" component={CreateStore} />
          </StoreContent>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
