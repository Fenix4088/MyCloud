import './App.scss';
import { Navbar } from './components/Navbar/Navbar';
import {Route, Switch} from "react-router-dom";
import {Login} from "./components/Login/Login";
import {Registration} from "./components/Registration/Registration";

function App() {
  return (
    <div className='app'>
      <Navbar />
    <Switch>
        <Route path={'/login'} exact component={() => <Login/>}/>
        <Route path={'/registration'} exact component={() => <Registration/>}/>
    </Switch>
    </div>
  );
}

export default App;
