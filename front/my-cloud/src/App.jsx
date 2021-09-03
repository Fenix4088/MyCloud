import './App.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkIsAuth } from './redux/reducers/userReducer/userReducer';
import Main from './components/Main/Main';
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsAuth());
  }, []);

  return (
    <div className='app'>
      <Navbar />
      <Switch>
        <Route path={'/'} exact component={() => <Main />} />
        <Route path={'/login'} exact component={() => <Login />} />
        <Route path={'/registration'} exact component={() => <Registration />} />
      </Switch>
    </div>
  );
}

export default App;

 