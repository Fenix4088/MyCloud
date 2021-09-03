import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const withRedirect = (MyComponent, revertedValue = false, path = '/login') => (props) => {
  const isAuth = useSelector((state) => state.userReducer.isAuth);

  const condition = revertedValue ? !!isAuth : !isAuth;

  if (condition) {
    return <Redirect to={path} />;
  }

  return <MyComponent {...props} />;
};
