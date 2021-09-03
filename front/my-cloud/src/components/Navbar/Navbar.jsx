import React from 'react';
import s from './Navbar.module.scss';
import logo from '../../assets/img/logo.png';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../../redux/reducers/userReducer/userReducer';

export const Navbar = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const logoutBtnHandler = () => dispatch(logout());

  return (
    <div className={s['navbar']}>
      <div className={s['container']}>
        <div className={s['column']}>
          <img src={logo} alt='Logo' className={s['logo']} />
          <div className={s['header']}>MERN CLOUD</div>
        </div>
        <div className={s['column']}>
          {!isAuth ? (
            <>
              <NavLink to={'/login'} className={s['login']}>
                Sing in
              </NavLink>
              <NavLink to={'/registration'} className={s['registration']}>
                Registration
              </NavLink>
            </>
          ) : (
            currentUser && (
              <>
                <span>{currentUser.email}</span>
                <button className={s['logout']} onClick={logoutBtnHandler}>
                  Logout
                </button>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};
