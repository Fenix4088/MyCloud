import React from 'react';
import s from './Navbar.module.scss';
import logo from '../../assets/img/logo.png';
import {NavLink} from "react-router-dom";

export const Navbar = () => {
  return (
    <div className={s['navbar']}>
      <div className={s['container']}>
        <div className={s['column']}>
          <img src={logo} alt='Logo' className={s['logo']} />
          <div className={s['header']}>MERN CLOUD</div>
        </div>
        <div className={s['column']}>
          <NavLink to={'/login'} className={s['login']}>Sing in</NavLink>
          <NavLink to={'/registration'} className={s['registration']}>Registration</NavLink>
        </div>
      </div>
    </div>
  );
};
